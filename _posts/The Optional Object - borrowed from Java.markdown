---
layout: post
title: 
categories: software-architecture
tags: software-architecture
---

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

Limitations in PHP: Lack of generics.

```php
```

## When to use which?

Use Result Object When:

* You want to provide additional information along with the result (e.g., error messages).
* You need to convey success or failure explicitly.
* You want to avoid throwing exceptions for non-exceptional cases.

In summary, use a result object when you need to provide more context about the result, including potential errors.

Use Optional When:

* You are dealing with cases where the absence of a value is expected and not exceptional.
* You want to avoid explicit null checks.
* You want to encourage a more functional programming style.

Use Optional when you want to represent the absence of a value more explicitly and avoid dealing with null directly.

When to not use any of both:

* Your return value is unambigious, e.g. a boolean or an int.

## Conclusion

Each has its use cases, and the choice may depend on the specific requirements of your code and the programming language you are using. I actually think that the PHP world should take more good things from other languages.

Will this add more code to your project? Yes, and I agree, I usually try to avoid more code, because more translates to complexity, which we want to avoid. However, using those objects makes your code more robust and more expressive, therefore you increase the productivity of the developers.
