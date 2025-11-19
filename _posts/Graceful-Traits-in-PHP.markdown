---
layout: post
title: Traits in PHP
date: 2025-07-20 16:32:21 +0000
categories: software-development
tags:
    - PHP
    - software-development
---

PHP lacks multi-inheritance and built-in aspect oriented programming capabilities.

Traits were added as a measure to mitigate those conceptual problems.

Traits cannot enforce the presence of required methods, so this kind of coupling is brittle and leads to runtime errors instead of static analysis warnings.

```php
trait LoggerTrait
{
    public function logInfo(string $message): void
    {
        // This will fail if 'getLogger'
        // is not implemented in the class using this trait
        $logger = $this->getLogger();
        $logger->info($message);
    }
}

class MyService
{
    use LoggerTrait;
}

$service = new MyService();
$service->logInfo("This will fail!");
```

You should make a trait more robust and fail "gracefully" by telling the person using it what needs to be done if the trait relies on method calls on the class or type of classes it is supposed to be used with. This increases developer experience by explaining the cause and by providing a solution at the same time.

```php
trait LoggerTrait
{
    public function logInfo(string $message): void
    {
        $this->assertGetLoggerExists();

        $logger = $this->getLogger();
        $logger->info($message);
    }

    private function assertGetLoggerExists(): void
    {
        if (!method_exists($this, 'getLogger')) {
            throw new \RuntimeException(sprintf(
                'The method %s::getLogger() is required when using LoggerTrait but was not found.',
                static::class
            ));
        }
    }
}

class MyService
{
    use LoggerTrait;
}

$service = new MyService();
$service->logInfo("This will fail gracefully!");
```

## Alternatives

So what could be an alternative? There are actually two: use dependency injection instead of a trait or implement a default method in the trait and inform the developer.

### Use dependency injection instead

```php
class MyService
{
    public function __construct() {
        LoggerInterface $logger
    }
}
```

```php
trait LoggerTrait
{
    protected ?LoggerInterface = null;

    public function logInfo(string $message): void
    {
        if ($this->logger) {
            $this->logger->log($message);
        }
    }
}
```

### Implement a stub with a message

You can also implement the desired method in the trait as a stub and throw an expressive, informative exception, that will communicate the problem to the developer.

```php
trait LoggerTrait
{
    protected ?LoggerInterface = null;

    public function logInfo(string $message): void
    {
        throw new \Exception(
            'Please overwrite the {__METHOD__} method in the class' .
            '{__CLASS__} for the LoggerTrait to be used.'
        );
    }
}
```

## Conclusion

My personal opinion is to avoid traits whenever possible and to use dependency injection instead.

If that is not a good option, then traits should not rely on a _specific_ implementation of a class they're used on. Because if this is the case, then the question would be why not to extend the class and maybe use an interface on it that can be checked if needed by some other code suing that class via `instanceOf`. A trait that relies on any methods being provided by the class is brittle and therefore a bad design.

And if you have to use traits they should implement only pure functions and they should be stateless.
