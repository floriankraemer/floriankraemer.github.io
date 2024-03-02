---
layout: post
title: Result Objects vs simple Return Types
categories: software-architecture
tags: software-architecture
---

Result objects and simple return types serve different purposes, and their advantages depend on the specific use case and design goals. As usual in software architecture there will be trade offs.

Lets take a look at a simple example of a return object. Note that instead of using `isSuccessful()` you could also just `hasFailed()`, whatever suits your taste and semantics.

```php
class OperationResult
{
    public function __construct(
        protected bool $isSuccessful,
        protected int $errorCode = 0,
        protected string $errorMessage = '',
    ) {}

    public static function failed(
        string $errorMessage,
        int $errorCode = 0
    ): self
    {
        return new static(
            isSuccessful: false,
            errorCode: $errorCode,
            errorMessage: $errorMessage,
        );
    }

    public static function success(): self
    {
        return new static(
            isSuccessful: true,
        );
    }

    public function wasSuccessful(): bool
    {
        return $this->isSuccessful;
    }

    public function hasFailed(): bool
    {
        return !$this->isSuccessful;
    }

    public function getErrorCode(): int
    {
        return $this->errorCode;
    }

    public function getErrorMessage(): string
    {
        return $this->errorMessage;
    }
}
```

Simple return type version:

```php
// Returns boolean
$passwordUpdateWasSuccessful = $this->service->updatePassword(/*...*/);

if (!$passwordUpdateWasSuccessful) {
    // How do we get the error message? 
    // Exception? Calling a methond on the service?
    // The message should actuall belong to the service and NOT be declared here,
    // where it is out of context.
}

// How do we get possible additional data?
$this->service->getUser($userId);
```

Result object version:

```php
// Returns OperationResult
$passwordUpdate = $this->service->updatePassword(/*...*/);

if ($passwordUpdate->hasFailed()) {
    echo $passwordUpdate->getError();
}

// Get the updated user entity
$passwordUpdate->getUser();
```


## Simple Return Types

* **Simplicity:**
  * Advantage: Simple return types, such as primitive values or basic data structures, are easy to understand and use.
  * Use Case: Appropriate for straightforward operations where the result can be easily represented by a single value (e.g., a boolean, integer, string).
* **Readability:**
  * Advantage: The code is often more readable when the return type is straightforward and the intention is clear.
  * Use Case: Suitable for simple functions or methods where the result is unambiguous.
* **Reduced Overhead:**
  * Advantage: Less overhead in terms of object creation and memory usage.
  * Use Case: Appropriate for scenarios where simplicity and minimal resource usage are essential.

## Result Objects

* **Semantic Clarity:**
  * Advantage: Result objects provide a way to encapsulate not just the result but additional context or metadata about the operation.
  * Use Case: Useful when the operation can result in multiple outcomes, and it's important to communicate more than just the final value (e.g., success/failure, error details). 
* **Error Handling:**
  * Advantage: Result objects can include information about errors or exceptions, making it easier to handle and propagate errors in a standardized way.
  * Use Case: Beneficial when dealing with operations that may encounter errors, allowing for more robust error handling.
* **Extensibility:**
  * Advantage: Result objects can be extended to include additional information as needed, providing flexibility for future changes.
  * Use Case: Useful in scenarios where the result may evolve or require more context over time.
* **Consistency:**
  * Advantage: Result objects enforce a consistent approach to handling results across the codebase.
  * Use Case: Suitable for projects where a standardized approach to result handling is desirable.
* **Testability:**
  * Advantage: Result objects can facilitate testing by encapsulating both the expected result and any additional information that needs to be verified.
  * Use Case: Valuable in test-driven development (TDD) and unit testing scenarios.

## Choosing Between Them

The choice between simple return types and result objects depends on the specific requirements of the operation and the level of information needed by the calling code.

In many cases, a balance between simplicity and context is necessary. Simple return types may suffice for straightforward operations, while result objects may be more appropriate for complex scenarios or those involving potential errors.

Ultimately, the decision should align with the goals of your application, the complexity of the operations, and the maintainability of the codebase.
