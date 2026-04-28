---
layout: post
title: 'The Value of Value Objects'
categories: software-architecture
tags: 
    - software-architecture
    - oop
    - design-patterns
    - ddd
    - tactical-patterns
draft: false
published: true
comments: true
date: 2026-04-27T08:01:41.000Z
---

I'm still surprised to see that so many people still do not use value objects. I'm not sure about the reasons for that, but I'll give it a try at explaining why they're beneficial. Some people also seem to think that value objects are only useful if you have a combination of two or more values, which is wrong. Others might think it's not worth the additional lines of code. However, the lack of use of value objects is even considered an architectural smell that is called "Primitive Obsession".

Value objects are super useful to enforce business rules and constraints. And no, this is not the same as validation, but this is a topic for another article. They actually can help to prevent bugs.

## Demonstrating the Value of Value Objects by Example

Given we have this code, what do you think is probably wrong here? Take a moment to think about it and think beyond math.

{% tabs vo-lsp-intro %}

{% tab vo-lsp-intro PHP %}
```php
<?php

interface IExample
{
    public function getPositiveInteger(): int;
}

final class Alpha implements IExample
{
    public function getPositiveInteger(): int
    {
        return 2 + 2;
    }
}

final class Beta implements IExample
{
    public function getPositiveInteger(): int
    {
        return 2 - 4;
    }
}
```
{% endtab %}

{% tab vo-lsp-intro C# %}
```csharp
interface IExample {
    int GetPositiveInteger();
}

class Alpha : IExample { 
    public int GetPositiveInteger() => 2 + 2;
}

class Beta : IExample { 
    public int GetPositiveInteger() => 2 - 4;
}
```
{% endtab %}

{% tab vo-lsp-intro Java %}
```java
interface IExample {
    int getPositiveInteger();
}

class Alpha implements IExample {
    @Override
    public int getPositiveInteger() {
        return 2 + 2;
    }
}

class Beta implements IExample {
    @Override
    public int getPositiveInteger() {
        return 2 - 4;
    }
}
```
{% endtab %}

{% endtabs %}

I hope that you have spotted the logical issue here: the method is luckily named “get**Positive**Integer” but `2 - 4` obviously will return `-2`. The type here is `int`, and therefore you'll get a negative number back, despite the fact that this is not what the method intends. In this case you are lucky that the naming of the method expresses its intent; unfortunately, this is often not the case and this information is hidden.

This is a [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) violation: The code will break the behavior, despite being valid code. Even the type check here does not prevent a change in behavior by returning a negative number in this case.

If you take the intended contract to include “the returned value is a positive integer” (from the name, docs, or team convention), then Beta weakens that postcondition compared to what callers are allowed to assume when they use IExample. A program that is correct when it uses Alpha can become incorrect if you substitute Beta—classic LSP failure with respect to that **behavioral contract**.

While strictly seen, the **formal** contract of the type system is correct in the sense of the LSP, but there is a **behavioral** break. The LSP is strictly seen "just" that subtypes must be usable anywhere the base type is expected without breaking a correct program—where “correct” is defined by the actual specification of the abstraction (often pre/postconditions, invariants), not only by what compiles.

So how do we fix that?

### Two Ways of Fixing It

1. Return a value object "PositiveNumber" as data type, that does the check internally and does not accept negative values. Bonus: This also communicates intent and also fulfills SRP. You can immediately tell by the name of the type what it does.

2. Document `NegativeResultException` with `/// <exception cref="NegativeResultException">` on the interface or base class and **hope** (or enforce it via an architectural rule checker) everyone implements it or the static analyzer is capable of finding that it is not thrown. Therefore, this is not recommended, because it is not explicitly enforced.

{% tabs vo-positive-from-int %}

{% tab vo-positive-from-int PHP %}
```php
<?php

final class PositiveInteger
{
    private function __construct(private readonly int $number) {}

    public static function fromInt(int $number): self
    {
        if ($number < 0) {
            throw new InvalidArgumentException(
                "The provided value {$number} is not a positive number"
            );
        }

        return new self($number);
    }
}
```
{% endtab %}

{% tab vo-positive-from-int C# %}
```csharp
public sealed class PositiveInteger : IEquatable<PositiveInteger>
{
    private readonly int _number;

    private PositiveInteger(int number) => _number = number;

    public static PositiveInteger FromInt(int number)
    {
        if (number < 0) {
            throw new ArgumentException(
                $"The provided value {number} is not a positive number"
            );
        }

        return new PositiveInteger(number);
    }
}
```
{% endtab %}

{% tab vo-positive-from-int Java %}
```java
public final class PositiveInteger {
    private final int number;

    private PositiveInteger(int number) {
        this.number = number;
    }

    public static PositiveInteger fromInt(int number) {
        if (number < 0) {
            throw new IllegalArgumentException(
                "The provided value " + number + " is not a positive number"
            );
        }

        return new PositiveInteger(number);
    }
}
```
{% endtab %}

{% endtabs %}

Let us update the existing code:

{% tabs vo-lsp-fixed %}

{% tab vo-lsp-fixed PHP %}
```php
<?php

interface IExample
{
    public function getPositiveInteger(): PositiveInteger;
}

final class Alpha implements IExample
{
    public function getPositiveInteger(): PositiveInteger
    {
        return PositiveInteger::fromInt(2 + 2);
    }
}

final class Beta implements IExample
{
    public function getPositiveInteger(): PositiveInteger
    {
        return PositiveInteger::fromInt(2 - 4);
    }
}
```
{% endtab %}

{% tab vo-lsp-fixed C# %}
```csharp
interface IExample { PositiveInteger GetPositiveInteger(); }

class Alpha : IExample { 
    public PositiveInteger GetPositiveInteger() => PositiveInteger.FromInt(2 + 2);
}

class Beta : IExample { 
    public PositiveInteger GetPositiveInteger() => PositiveInteger.FromInt(2 - 4);
}
```
{% endtab %}

{% tab vo-lsp-fixed Java %}
```java
interface IExample {
    PositiveInteger getPositiveInteger();
}

class Alpha implements IExample {
    @Override
    public PositiveInteger getPositiveInteger() {
        return PositiveInteger.fromInt(2 + 2);
    }
}

class Beta implements IExample {
    @Override
    public PositiveInteger getPositiveInteger() {
        return PositiveInteger.fromInt(2 - 4);
    }
}
```
{% endtab %}

{% endtabs %}

Now the LSP is fulfilled and it is impossible to return a value (object) that does not match the expectation.

### Leaner `PositiveInteger` Types in C# and Java

In **C#**, a **`public readonly record struct`** trims a lot of ceremony compared with a hand-rolled class—especially immutability and structural equality. A minimal positional declaration such as `public readonly record struct PositiveInteger(int Value);` is still **not** a drop-in replacement for the guarded type from earlier: the compiler synthesizes a **public** constructor, so `new PositiveInteger(-1)` would compile and bypass your rule.

In **Java**, the same trap exists for a compact **`record PositiveInteger(int value)`**: validation in a *compact constructor* still leaves the canonical constructor **public**, so `new PositiveInteger(-1)` is legal. To mirror the C# guard, the Java tab uses a **`final` class** with a **private** constructor and a static **`fromInt`** factory.

{% tabs vo-record-struct %}

{% tab vo-record-struct C# %}
```csharp
public readonly record struct PositiveInteger
{
    public int Value { get; }

    // Private constructor prevents bypass of business rules
    private PositiveInteger(int value) => Value = value;

    public static PositiveInteger FromInt(int value)
    {
        if (value < 0) {
            throw new ArgumentException(
                $"The provided value {value} is not a positive number", nameof(value)
            );
        }

        return new PositiveInteger(value);
    }

    // Optional: Allow implicit conversion to int for cleaner usage
    public static implicit operator int(PositiveInteger posInt) => posInt.Value;
}
```
{% endtab %}

{% tab vo-record-struct Java %}
```java
public final class PositiveInteger {
    private final int value;

    private PositiveInteger(int value) {
        this.value = value;
    }

    public static PositiveInteger fromInt(int value) {
        if (value < 0) {
            throw new IllegalArgumentException(
                "The provided value " + value + " is not a positive number"
            );
        }
        return new PositiveInteger(value);
    }

    public int value() {
        return value;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof PositiveInteger other)) {
            return false;
        }
        return value == other.value;
    }

    @Override
    public int hashCode() {
        return value;
    }
}
```
{% endtab %}

{% endtabs %}

**C#** — With this `readonly record struct` shape, you get:

1. **Immutability**: `readonly` on the struct and the `Value` accessor pattern keeps the instance from mutating after construction.
2. **Performance**: As a value type, the struct often avoids a separate heap allocation for locals and parameters and can be laid out inline inside other objects, which usually means less GC pressure than a class—subject to boxing and other caveats.
3. **Structural equality**: The compiler still generates `Equals`, `GetHashCode`, and `==`/`!=` for the record part, so `PositiveInteger.FromInt(5) == PositiveInteger.FromInt(5)` is true without hand-written equality members.

**Java** — The `final` class above trades record sugar for a hard boundary:

1. **Immutability**: `private final int value` and no setter preserve the same idea as the C# example.
2. **Performance**: Instances are ordinary heap objects (Java has no `struct` analogue here); for typical value-object sizes that is usually acceptable.
3. **Structural equality**: You keep explicit `equals` and `hashCode` so collections and comparisons treat two instances with the same value as equal—what a `record` would generate for you, at the cost of the public canonical constructor you wanted to avoid.

## Another Example Case

This actually happened to me and other people I know; it is a very real example. So let's take a look at this method. Looks right?

{% tabs vo-friendship-call %}

{% tab vo-friendship-call PHP %}
```php
requestFriendship($requestingUserId, $requestedUserId);
```
{% endtab %}

{% tab vo-friendship-call C# %}
```csharp
RequestFriendship(requestingUserId, requestedUserId);
```
{% endtab %}

{% tab vo-friendship-call Java %}
```java
requestFriendship(requestingUserId, requestedUserId);
```
{% endtab %}

{% endtabs %}

Wrong. Pay attention to the naming of the arguments and you'll see what mistake you've just made.

{% tabs vo-friendship-sig-wrong %}

{% tab vo-friendship-sig-wrong PHP %}
```php
function requestFriendship(int $requestedUserId, int $requestingUserId): void {}
```
{% endtab %}

{% tab vo-friendship-sig-wrong C# %}
```csharp
void RequestFriendship(
    int requestedUserId,
    int requestingUserId
);
```
{% endtab %}

{% tab vo-friendship-sig-wrong Java %}
```java
void requestFriendship(int requestedUserId, int requestingUserId) {}
```
{% endtab %}

{% endtabs %}

It is super easy to make this mistake, and I've seen it happen more than once for other people, and I have also made such mistakes. Actually, it could be worse and the arguments could be named just `user1` and `user2`, making this even more easy to mistake.

A value object will prevent this and make it explicit, the different types will prevent that. You can't make this mistake anymore:

{% tabs vo-friendship-sig-vo %}

{% tab vo-friendship-sig-vo PHP %}
```php
function requestFriendship(RequesterId $requesterId, RequestedPersonId $requestedPersonId): void {}
```
{% endtab %}

{% tab vo-friendship-sig-vo C# %}
```csharp
void RequestFriendship(
    RequesterId requesterId,
    RequestedPersonId requestedPersonId
);
```
{% endtab %}

{% tab vo-friendship-sig-vo Java %}
```java
void requestFriendship(RequesterId requesterId, RequestedPersonId requestedPersonId) {}
```
{% endtab %}

{% endtabs %}

Also note that we changed the naming to follow the actual language of the domain, instead of using the term `User`. Many developers love calling actors `User`, no matter what the context is.

## One more Example to cure Primitive Obsession

Primitive obsession occurs when you rely on basic data types (strings, integers, doubles) to represent complex domain concepts that have their own rules and logic. It’s problematic because primitives are "dumb"—a string doesn't know it’s supposed to be a valid email address, and an int doesn't know a "Price" can't be negative. This forces you to scatter validation logic throughout your codebase, increases the risk of passing arguments in the wrong order, and makes your code harder to read and maintain.

The value objects will ensure that the invariant, the business rules associated with your value objects are always true, no matter where you use that value. If your rule would be to never have a negative price and you go with integers or floats (Don't do floats for money!), you'll have to have this check in a lot of places, while it is logical to encapsulate that concept in the price object itself.

### The "Obsessed" Example

In this version, we use a simple string for an email. Notice how the User class has to take on the burden of validating what an "Email" actually is.

{% tabs vo-user-primitive %}

{% tab vo-user-primitive PHP %}
```php
<?php

class User
{
    public function __construct(
        public string $name,
        /** Problem: This could be "not-an-email", " ", or null. */
        public ?string $email
    ) {}

    public function updateEmail(string $newEmail): void
    {
        if ($newEmail === '' || trim($newEmail) === '' || !str_contains($newEmail, '@')) {
            throw new InvalidArgumentException('Invalid email');
        }

        $this->email = $newEmail;
    }
}
```
{% endtab %}

{% tab vo-user-primitive C# %}
```csharp
public class User
{
    public string Name { get; set; }
    // Problem: This could be "not-an-email", " ", or null.
    public string Email { get; set; } 

    public void UpdateEmail(string newEmail)
    {
        if (string.IsNullOrWhiteSpace(newEmail) || !newEmail.Contains("@"))
            throw new ArgumentException("Invalid email"
        );

        Email = newEmail;
    }
}
```
{% endtab %}

{% tab vo-user-primitive Java %}
```java
public class User {
    public String name;
    // Problem: This could be "not-an-email", " ", or null.
    public String email;

    public void updateEmail(String newEmail) {
        if (newEmail == null || newEmail.isBlank() || !newEmail.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        this.email = newEmail;
    }
}
```
{% endtab %}

{% endtabs %}

### The Refactored Example

By creating a Value Object, we encapsulate the logic. Once an EmailAddress object exists, you can be certain it is valid, no matter where it is passed in your system.

If a developer uses the object initializer (e.g., `new EmailAddress { Value = "not-an-email" })`, they can bypass your constructor logic because Value is an init property, so we make it private.

{% tabs vo-email-refactor %}

{% tab vo-email-refactor PHP %}
```php
<?php

final readonly class EmailAddress
{
    private function __construct(public string $value) {}

    public static function fromString(string $value): self
    {
        // Of course you should have a little more strict check here, depending on your requirements
        if (trim($value) === '' || !str_contains($value, '@')) {
            throw new InvalidArgumentException('Invalid email format.');
        }

        return new self($value);
    }
}

final class User
{
    public function __construct(
        public string $name,
        private EmailAddress $email
    ) {}

    public function email(): EmailAddress
    {
        return $this->email;
    }

    public function updateEmail(EmailAddress $newEmail): void
    {
        $this->email = $newEmail;
    }
}
```
{% endtab %}

{% tab vo-email-refactor C# %}
```csharp
public record EmailAddress
{
    public string Value { get; private init; }

    public EmailAddress(string value)
    {
        // Of course you should have a little more strict check here, depending on your requirements
        if (string.IsNullOrWhiteSpace(value) || !value.Contains("@"))
            throw new ArgumentException("Invalid email format.");
            
        Value = value;
    }
    
    // Optional: implicit conversion for cleaner syntax
    public static implicit operator string(EmailAddress email) => email.Value;
}

public class User
{
    public string Name { get; set; }
    // The type itself guarantees validity
    public EmailAddress Email { get; private set; }

    public void UpdateEmail(EmailAddress newEmail)
    {
        Email = newEmail;
    }
}
```
{% endtab %}

{% tab vo-email-refactor Java %}
```java
public final class EmailAddress {
    private final String value;

    public EmailAddress(String value) {
        // Of course you should have a little more strict check here, depending on your requirements
        if (value == null || value.isBlank() || !value.contains("@")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        this.value = value;
    }

    public String value() {
        return value;
    }
}

public class User {
    public String name;
    public EmailAddress email;

    public void updateEmail(EmailAddress newEmail) {
        this.email = newEmail;
    }
}
```
{% endtab %}

{% endtabs %}

Refactoring primitives into dedicated types fundamentally improves type safety by making it impossible to accidentally swap a username with an email address in a method signature—the compiler simply won't allow it. This shift also enables centralized logic, where any update to validation rules, such as a new regex pattern, is handled within the type's constructor rather than being duplicated across the UI and database layers.

Beyond the technical guardrails, it dramatically enhances readability; an EmailAddress type communicates the code's domain intent immediately, providing far more context to future developers than a generic, "dumb" string ever could.

## Equality of Value Objects

Crucially, **a Value Object is defined by its data rather than its identity**. In a standard class, two objects are typically only considered equal if they occupy the same spot in memory—this is Reference Equality. For a true Value Object, the expression 5 == 5 must always evaluate to true, regardless of whether they are different instances in the system.

If you don't override the equality logic (or use a C# record), you’ve essentially just built a "Wrapper Object." Without this **structural equality**, you lose the ability to use these objects predictably in sets, dictionaries, or comparisons, which defeats the architectural purpose of treating them as distinct values.

An important note here: **Validation checks if input is correct; Value Objects ensure that once data is in your system, it stays correct**. So the exceptions here are not thought to propagate back to some UI as an error message, but are a tool to show the developer that something went very wrong should you ever get to this exception.

{% tabs vo-equality %}

{% tab vo-equality PHP %}
```php
<?php

final class PositiveInteger
{
    private function __construct(private readonly int $number) {}

    public static function fromInt(int $number): self
    {
        if ($number < 0) {
            throw new InvalidArgumentException(
                "The provided value {$number} is not a positive number"
            );
        }

        return new self($number);
    }

    public function equals(?self $other): bool
    {
        return $other !== null && $this->number === $other->number;
    }

    public function hashCode(): int
    {
        return $this->number;
    }
}
```
{% endtab %}

{% tab vo-equality C# %}
```csharp
public sealed class PositiveInteger : IEquatable<PositiveInteger>
{
    private readonly int _number;

    private PositiveInteger(int number) => _number = number;

    public static PositiveInteger FromInt(int number)
    {
        if (number < 0) {
            throw new ArgumentException(
                $"The provided value {number} is not a positive number"
            );
        }

        return new PositiveInteger(number);
    }

    public override bool Equals(object? obj) => obj is PositiveInteger other && Equals(other);

    public bool Equals(PositiveInteger? other) =>
        other is not null && _number == other._number;

    public override int GetHashCode() => _number;

    // "While these objects protect data, you may need to add operator overloads (like +)
    // if you plan on doing arithmetic with them."
    public static bool operator ==(PositiveInteger? left, PositiveInteger? right)
    {
        if (ReferenceEquals(left, right)) return true;

        return left is not null && left.Equals(right);
    }

    public static bool operator !=(PositiveInteger? left, PositiveInteger? right) =>
        !(left == right);
}
```
{% endtab %}

{% tab vo-equality Java %}
```java
public final class PositiveInteger {
    private final int number;

    private PositiveInteger(int number) {
        this.number = number;
    }

    public static PositiveInteger fromInt(int number) {
        if (number < 0) {
            throw new IllegalArgumentException(
                "The provided value " + number + " is not a positive number"
            );
        }
        return new PositiveInteger(number);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof PositiveInteger other)) {
            return false;
        }
        return number == other.number;
    }

    @Override
    public int hashCode() {
        return number;
    }
}
```
{% endtab %}

{% endtabs %}

## It Is not Enough to Just Write Code

Code must reflect the semantic meaning of the things you are trying to model and it should be unambiguous.

A sender and a receiver are certainly not the same thing semantically; they are completely different concepts. To avoid logical mistakes you should reflect and describe them explicitly in code as well instead of saying "Yeah, they're all just integers".

To summarize it:

* A Value Object is defined by its data rather than its identity.
* Validation checks if input is correct; Value Objects ensure that once data is in your system, it stays correct.
* Value objects ideally encapsulate concepts from your domain model and enforce invariants.
* Value objects can have more than one internal value, e.g. Money could be a composite of the amount and the currency.
