---
layout: post
title: My take on Exceptions
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

Exception-driven development, also known as "throw first, ask questions later".

## Why can exceptions be bad?

Here are some reasons why it might be considered bad:

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

* An exception **SHOULD** be used for *unexpected* and *unrecoverable* behavior that can't be handled by the library.
* Exceptions **SHOULD** mostly be used by libraries and frameworks and in the infrastructure layer in applications.
* An application **SHOULD** handle them (mostly for UX reasons).

For example throwing a `HttpNotFoundException()``, that will be caught and transformed into a HTTP status 404 response is what I consider exception driven development. This is no exceptional nor an unrecoverable state the system went into. If a resource was not found, then this is a clear, possible and expected outcome of an operation. So why don't you just return the correct state explicitly instead of relying on a mechanism that is abused for that?

Some people argue about convenience and having to type more, both is simply not true, though it depends on how your concrete system works:

```php
// Using a response object that represents a HTTP 404 response
$product = $this->ProductRepository->getBySku($sku);
if (!$roduct) {
    return new NotFoundResponse();
}
```

```php
// Throwing the NotFoundException manually
$product = $this->ProductRepository->getBySku($sku);
if (!$roduct) {
    throw new NotFoundException();
}
```

```php
// Throwing the RecordNotFoundException in the repository
$product = $this->ProductRepository->getBySku($sku);
```

Another very valid case for using exceptions is within the domain layer. As we know the domain should ensure the correctness of the business logic, by making sure that the state of a process is never invalid.

Here is a value object that will throw an exception if the passed string value is not a valid email address. For those who don't know what value object is, one of its purposes is to ensure exactly what we see here, the correctness of the data within the aggregate or business process. If the email is invalid, things can go really bad, e.g. a customer could not receive an invoice. The exception here will prevent an unrecoverable wrong state. You might think "Well, but I can update it?" but, because when the invoice was attempted to send to an invalid address, the problem already happened.

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
    private function assertValidEmail()
    {
        /* Implementation... */ 
    }
}
```
