---
layout: post
title: "The Optional Object (borrowed From Java): A Guide to Handling Null Values Gracefully"
categories: software-architecture
tags: software-architecture, oop
---

In software development, dealing with null values is a common source of bugs and errors. The Optional object, popularized by Java 8, offers a way to handle null values gracefully, reducing the risk of NullPointerException. While we do not have this risk in PHP the optional still provides benefits. This guide adapts the concept for PHP, demonstrating how to use an Optional class to improve code safety and readability.

## What is Optional?

Optional is a container object that may or may not contain a non-null value. It provides a way to express the presence or absence of a value explicitly, allowing developers to handle potential nulls more effectively. The PHP version of Optional can be used to avoid tedious null checks and improve the overall quality of your code.

**The main purpose of an optional is basically to *explicitly* tell the user the object *might* not exist.**

### Benefits of Using Optional

* Reduces Null Pointer Errors: By forcing the handling of absent values explicitly, Optional reduces the risk of null pointer errors.
* Improves Readability: It makes the code more readable by clearly indicating when a value may be absent.
* Encourages Functional Programming: Optional promotes the use of functional programming techniques, such as mapping and flat mapping.

Optionals are intended to be used as return types. Don't use them anywhere else.

----

In the previous article I wrote about result objects, but what if we do not have a clear result and don't need to communicate error messages or codes?

There is another strategy we can use: Optional. I've borrowed the concepts from the Java world, from where I've got the concept.

## Java's Optional

[Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) in Java is designed to represent an optional value that may or may not be present. It's a way to explicitly declare that a method might return a value or might not. It helps avoid null checks and encourages more expressive code.

```java
Optional<String> getName() {
    // Some logic to get a name, might return null
    // or an actual value wrapped in Optional
}

Optional<String> name = getName();

if (name.isPresent()) {
    System.out.println("Name: " + name.get());
} else {
    System.out.println("Name not present");
}
```

## Optional in PHP

I've created a PHP version of "Optional": [https://github.com/phauthentic/php-optional](https://github.com/phauthentic/php-optional)

It is well tested with mutation testing and all "mutants" were killed. Therefore it should be already pretty stable.

```php
$user = $repository->findUserById($id);
if ($user !== null) {
    // Process user
} else {
    // Handle absence
}
```

With Optional, the method can return an Optional object:

```php
$optionalUser = $repository->findUserById($id);
$optionalUser->ifPresent(function($user) {
    // Process user
});
```

Or handle the absence more fluently:

```php
$user = $optionalUser->orElse(new DefaultUser());
```

## When to use which?

### Use Result Object When

* You want to provide additional information along with the result (e.g., error messages).
* You need to convey success or failure explicitly.
* You want to avoid throwing exceptions for non-exceptional cases.

In summary, use a result object when you need to provide more context about the result, including potential errors.

### Use Optional When

* You are dealing with cases where the absence of a value is expected and not exceptional.
* You want to avoid explicit null checks.
* You want to encourage a more functional programming style.

Use Optional when you want to represent the absence of a value more explicitly and avoid dealing with null directly.

### When to not use any of both

Your return value is an unambiguous primitive type , e.g. a boolean or an int and will NOT return null.

## Conclusion

Each has its use cases, and the choice may depend on the specific requirements of your code and the programming language you are using. I actually think that the PHP world should take more good things from other languages.

Will this add more code to your project? Yes, and I agree, I usually try to avoid more code, because more translates to complexity, which we want to avoid. However, using those objects makes your code more robust and more expressive, therefore you increase the productivity of the developers.
