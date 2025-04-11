## A Result

### Terminology {#terminology}

This document uses the terminology of “failure” vs “error” in the following definitions:

| Term | Definition |
| :---- | :---- |
| **Error**  | A bug in the code, an unintended consequence.  |
| **Failure**  | When the user (developer) sees something go wrong. Something that was expected and is predictable and is communicated in some way. |

### Differentiation between a Data Transfer Object and Result Object

There are people who claim that a result object is just another data transfer object, which is not true. Lets check the differences.

#### Data Transfer Object

Data Transfer Object is a simple object used to transfer data between layers or systems. Its purpose is purely to carry data — it contains no business logic, status information, or behavior. DTOs are often used for things like API requests and responses or persisting/retrieving entities from a database. They are **passive** data carriers, usually consisting of properties and sometimes constructors or factory methods, but no logic to interpret or act on that data.

#### Result Object

A Result Object (also known as response wrapper or outcome object) is designed to represent the outcome of an operation. It encapsulates whether the operation was successful or not, and may also carry associated data and error messages. This kind of object is useful in business logic where an operation may succeed or fail, and you want to return not just data, but also the state of the operation and any relevant metadata (like error reasons or codes). It may contain helper methods like isSuccess() or getError() to streamline checking the result.

The result of an operation can have strictly seen two possible outcomes:

* Success
* Failure

But the type or reason of failure can be variable, there can be more than one reason for failure. This needs to be communicated in some way. The receiver of that result should be able to easily determine this and the actual result object should communicate its state.

#### Comparison Table

| Aspect | DTO | Result Object |
| :---- | :---- | :---- |
| **Purpose** | Transport data | Represent operation outcome \+ data |
| **Includes status?** | ❌ No | ✅ Yes (e.g., isSuccess, error) |
| **Used for?** | Input/output data exchange | Wrapping business logic results |
| **Behavior?** | None | May have helper methods like isSuccess() |

* Use a DTO when you're just moving data around (API input/output, persistence, etc.).  
* Use a Result object when you want to report success/failure and potentially return data.

## Differentiation between a Data Transfer Object and Result Object

### Data Transfer Object

A DTO (Data Transfer Object) is a simple object used to transfer data between layers or systems. Its purpose is purely to carry data — it contains no business logic, status information, or behavior. DTOs are often used for things like API requests and responses or persisting/retrieving entities from a database. They are passive data carriers, usually consisting of properties and sometimes constructors or factory methods, but no logic to interpret or act on that data.

### Result Object

A Result Object (also known as response wrapper or outcome object) is designed to represent the outcome of an operation. It encapsulates whether the operation was successful or not, and may also carry associated data and error messages. This kind of object is useful in business logic where an operation may succeed or fail, and you want to return not just data, but also the state of the operation and any relevant metadata (like error reasons or codes). It may contain helper methods like isSuccess() or getError() to streamline checking the result.

### When to use which?

* Use a DTO when you're just moving data around (API input/output, persistence, etc.).
* Use a Result object when you want to report success/failure and potentially return data.





# Comparisons {#comparisons}

## Table {#table}

| Quality Attributes | \#1 Simple Property Access | \#2 Monade-Like | \#3 Mixed-Types | \#4 Exceptions |
| :---- | :---- | :---- | :---- | :---- |
| **Expressiveness** | ✅ Good | ✅ Good | 🚫 Reduced | 🚫 Not good |
| **Cohesion** | ✅ Yes | ✅ Yes | 🚫 No | 🚫 No |
| **Composeability** | ✅ Yes | ✅ Yes | 🚫 No | 🚫 No |
| **Type Checking required** | ✅ No | ✅ No | 🚫 Yes | ✅ No |
| **Null-Check Required** | 🚫 Yes | ✅ No | ✅ No | ✅ No |
| **PHPStan Complains** | 🚫 Yes | 🚫 Yes✅ No | ✅ No | ✅ No |
| **Uses exceptions to control flow** | ✅ No | ✅ No | ✅ No | 🚫 Yes |
| **DTOs with logic** | ✅ No | 🚫 Yes | ✅ No | ✅ No |
| **Lines of Code when used** | 8 | 5 | 5 | 15 |
| **Metrics** | 1 Object N Data Properties 2 Properties 2 If Statements | 1 Object N Data methods 2 Method calls 1 If Statement Usage of magic and Reflection | 2 Objects N Data Methods 1 If-Statements  | 2 Objects N Data properties 1 Try-Catch Block |


















```php
$result = $this->useCase->execute($input);

if ($result->hasFailed()) {
    // Do something with it
    echo $result->failure();
}
```
