---
layout: post
title: Exceptions - good or bad?
categories:
    - programming
    - software-architecture
    - development
tags: programming
keywords:
    - development
slug: exceptions
draft: false
date: 2023-05-10T09:28:36.000Z
---

Exception-driven development, also known as "throw first, ask questions later", is considered a bad practice. This article will provide a list of reasons when exceptions are bad and why you should not use them without a good reason.

## Why can exceptions be bad?

Here are some reasons why they could be considered bad:

* **Code readability and flow control:**
  * Code with excessive use of exceptions for *flow control can be harder to read and understand*.
  * The primary purpose of exceptions is to handle *exceptional*, error conditions, not to guide program flow.
* **Performance:**
  * Throwing and catching exceptions can be *relatively expensive* in terms of performance compared to other control flow mechanisms.
  * Using exceptions for normal program flow *may introduce unnecessary overhead*.
* **Debugging complexity:**
  * Exception-driven code can make debugging more challenging because the control flow is less obvious.
  * Developers may have a harder time understanding the exact sequence of events that led to an exception.
* **Unexpected side effects:**
  * Throwing exceptions in response to common or expected situations might lead to unexpected behavior.
  * Overuse of exceptions can make it difficult to distinguish between expected and unexpected errors.
* **Maintenance challenges:**
  * Code that relies heavily on exceptions may be more challenging to maintain, especially when multiple developers are involved.
  * Changes to the code may inadvertently introduce new exception paths or alter the expected flow.
* **Resource management:**
  * If exceptions are used to handle resource cleanup (e.g., closing files or connections), it may lead to resource leaks if not handled properly.
* **Lack of expressiveness:**
  * Overuse of exceptions may result in code that lacks expressiveness, making it harder to convey the developer's intent.
* **Testing difficulties:**
  * Testing code that heavily relies on exceptions can be more complex, as both the expected and exceptional paths need to be thoroughly tested.

## When to use an exception?

But when might it make sense to use an exception? There must be cases that can be considered as useful?

* An exception **SHOULD** be used for *unexpected* and *unrecoverable* behavior that can't be handled by the component.
* Exceptions **SHOULD** mostly be used in the domain and by libraries and frameworks and in the infrastructure layer in applications.
* An application **SHOULD** handle them in a graceful way (UX).
* An exception **MUST NOT** be used to control program flow.

For example throwing a `HttpNotFoundException()``, that will be caught and transformed into a HTTP status 404 response is what I consider exception driven development. This is no exceptional nor an unrecoverable state the system went into. If a resource was not found, then this is a clear, possible and expected outcome of an operation. So why don't you just return the correct state explicitly instead of relying on a mechanism that is abused for that?

Some people argue about convenience and having to type more, both is simply not true, though it depends on how your concrete system works.

Just return the correct response object if the record does not exist, e.g. is null.

```php
// Using a response object that represents a HTTP 404 response
$product = $this->ProductRepository->getBySku($sku);
if (!$roduct) {
    return new NotFoundResponse();
}
```

Throwing an exception:

* Catch it somewhere, like in a middleware or error handler, and turn it into a 404 response.

```php
// Throwing the HttpNotFoundException manually
$product = $this->ProductRepository->getBySku($sku);
if (!$roduct) {
    throw new HttpNotFoundException();
}
```

If you use an exception, like a RecordNotFoundException in the repository.

* Catch it somewhere, like in a middleware or error handler, and turn it into a 404 response.
* Or catch it manually, return a proper response object or throw a PageNotFoundException.

⚠ This leaks persistence infrastructure knowledge into the application layer!

```php
// ProductRepository class:
public function getBySku(string $sku): Product
{
    if (!$product) {
        throw new RecordNotFoundException();
    }
}

// Throws the RecordNotFoundException in the repository
$product = $this->ProductRepository->getBySku($sku);
```

### Example: Exceptions for infrastructure

Lets assume your DB has some trouble and your program can't connect to it. Most drivers throw an exception in such a case. But why is it a valid case?

The program can't recover from this on its own, some interaction is very likely required. However, in this case, the user of the driver could probably do something about it by catching the exception, logging the issue, informing somebody about the outage and even trying to connect to a backup system.

So we have a technically unrecoverable state of the application that can't be resolved easily, but the execption still provides a way for an engineer to handle this case.

### Example: Exceptions in the domain layer

Another very valid case for using exceptions is within the domain layer. As we know the domains duty is to ensure the correctness of the business logic, by making sure that the state of a process is never invalid.

Here is a [value object](https://en.wikipedia.org/wiki/Value_object) that will throw an exception if the passed string value is not a valid email address. For those who don't know what value object is, one of its purposes is to ensure exactly what we see here, the correctness of the data within the aggregate or business process. If the email is invalid, things can go really bad, e.g. a customer could not receive an invoice.

The exception here will prevent an *unrecoverable* wrong state. You might think "Well, but I can update it?" but, because when the invoice was attempted to send to an invalid address, the problem already happened.

```php
class Email
{
    private function __construct(
        string $email
    ) {}

    public static function fromString(string $email)
    {
        $this->assertValidEmail($email);

        return new static($email);
    }

    /**
     * @throws \InvalidArgumentException
     */
    private function assertValidEmail(string $email)
    {
        /* Implementation of the check */ 
        throw new InvalidArgumentException(sprintf(
            '`%s` is not a valid email address.',
            $email
        ));
    }
}
```

## Be pragmatic

If your framework or library works with exceptions to implement certain things, I personally would probably not consider it as great but it is what it is. If the framework helps you to get your job done this is in my opinion an acceptable downside if you get a net win from it.

But I would not recommend to intentionally go for exception based workflows.
