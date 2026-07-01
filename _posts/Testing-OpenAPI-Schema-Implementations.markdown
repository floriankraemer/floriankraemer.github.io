---
layout: post
title: 'Validating the Implementation against an OpenAPI Schema'
categories: software-architecture
tags: 
    - software-architecture
draft: true
published: false
comments: true
date: 2025-04-30
---

If not done carefully it is easy to make mistakes by either implementing OpenAPI specifications or by writing them after they were implemented. The second is in any case a very wrong approach, because the API should be designed before the code is written.

With any [PSR7](https://www.php-fig.org/psr/psr-7/) compatible implementation or Symfony it is very easy to validate that the implementation conforms to the specification.

## Testing the OpenAPI Schema

* Your test case must extend [App\Tests\ApiTestCase](../tests/ApiTestCase.php)
* Your test case must instantiate and set the [App\Tests\OpenAPISchemaValidator](../tests/OpenAPISchemaValidator.php) with the right schema. If you don't do this, the next steps will fail with an exception.
* Your test must call `assertRequestMatchesOpenAPISchema()` to validate the request against the OpenAPI schema.
* Your test must call `assertResponseMatchesOpenAPISchema()` to validate the response against the OpenAPI schema.

### Example

In your test case:

```php
public function setUp(): void
{
    parent::setUp();

    $this->openAPISchemaValidator = new OpenAPISchemaValidator(
        $this->getOpenAPISchemaFromCapability('Follow', 'InternalAPI/V1/FollowInternalAPIOpenAPI')
    );
}
```

In your test method, **after** you've made a request via the client:

```php
$this->assertRequestMatchesOpenAPISchema();
$this->assertResponseMatchesOpenAPISchema(
    path: '/api/v1/follows',
    method: 'post'
);
```

Because of Symfony not following the PSR standards for HTTP out of the box, we will have to convert them, because the validator library doesn't work with Symfony request and response objects. Luckily there is a bridge provided that we can install.

```bash
composer require nyholm/psr7 --dev
composer require league/openapi-psr7-validator --dev
composer require symfony/phpunit-bridge --dev
```

The test class:

```php
<?php

declare(strict_types=1);

namespace App\Tests;

use League\OpenAPIValidation\PSR7\Exception\ValidationFailed;
use League\OpenAPIValidation\PSR7\OperationAddress;
use League\OpenAPIValidation\PSR7\RequestValidator;
use League\OpenAPIValidation\PSR7\ResponseValidator;
use League\OpenAPIValidation\PSR7\ValidatorBuilder;
use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Message\RequestInterface as PsrRequestInterface;
use Psr\Http\Message\ResponseInterface as PsrResponseInterface;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

/**
 * Helper Class to validate requests and responses against an OpenAPI schema.
 *
 * - Converts Symfony HTTP Foundation requests and responses to PSR-7 requests and responses.
 * - Validates requests and responses against the OpenAPI schema.
 */
class OpenAPISchemaValidator
{
    protected PsrHttpFactory $psrHttpFactory;
    protected ResponseValidator $responseValidator;
    protected RequestValidator $requestValidator;
    protected ValidatorBuilder $validator;

    public function __construct(
        private readonly string $openApiSchemaPath,
    ) {
        $psr17Factory = new Psr17Factory();
        $this->psrHttpFactory = new PsrHttpFactory($psr17Factory, $psr17Factory, $psr17Factory, $psr17Factory);

        $this->validator = (new ValidatorBuilder())->fromYamlFile($this->openApiSchemaPath);
        $this->responseValidator = $this->validator->getResponseValidator();
        $this->requestValidator = $this->validator->getRequestValidator();
    }

    /**
     * @throws ValidationFailed
     */
    public function validateRequest(SymfonyRequest | PsrRequestInterface $request): void
    {
        if ($request instanceof SymfonyRequest) {
            $request = $this->psrHttpFactory->createRequest($request);
        }

        $this->requestValidator->validate($request);
    }

    /**
     * @throws ValidationFailed
     */
    public function validateResponse(
        SymfonyResponse | PsrResponseInterface $response,
        string $path,
        string $method,
    ): void {
        if ($response instanceof SymfonyResponse) {
            $response = $this->psrHttpFactory->createResponse($response);
        }

        $operation = new OperationAddress($path, $method);
        $this->responseValidator->validate($operation, $response);
    }
}
```

ApiTestCase

```php
<?php

declare(strict_types=1);

namespace App\Tests;

use RuntimeException;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Throwable;

class ApiTestCase extends WebTestCase
{
    use FixtureGeneratorTrait;

    protected ?OpenAPISchemaValidator $openAPISchemaValidator;

    public function getOpenAPISchemaValidator(): OpenAPISchemaValidator
    {
        if (null === $this->openAPISchemaValidator) {
            throw new RuntimeException('OpenAPISchemaValidator is not set.');
        }

        return $this->openAPISchemaValidator;
    }

    protected function assertApiRequestMatchesOpenAPISchema(): void
    {
        try {
            $this->getOpenAPISchemaValidator()->validateRequest(
                request: $this->getClient()->getRequest()
            );
        } catch (Throwable $throwable) {
            $this->fail('OpenAPI validation failed: ' . $throwable->getMessage());
        }
    }

    protected function assertApiResponseMatchesOpenAPISchema(
        string $path,
        string $method,
    ): void {
        try {
            $this->getOpenAPISchemaValidator()->validateResponse(
                response: $this->getClient()->getResponse(),
                path: $path,
                method: $method
            );
        } catch (Throwable $throwable) {
            $this->fail('OpenAPI validation failed: ' . $throwable->getMessage());
        }
    }
}
```
