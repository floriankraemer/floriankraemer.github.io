---
layout: post
title: 'Naming Matters: An Example'
categories: software-architecture
tags:
  - software-architecture
date: 2024-10-03T11:15:30.000Z
draft: false
comments: true
---

Developers spend a lot of time reading and understanding code, actually much more than writing code. Readability and understandability of code are very valuable quality attributes, because it impacts development speed and therefore development cost. Understandability can be improved a lot by just naming things properly.

> “Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...[Therefore,] making it easy to read makes it easier to write.”

 — Robert C. Martin, Clean Code: A Handbook of Agile Software Craftsmanship

In my current legacy project I was looking at some classes and found a small but surprisingly very ambiguous class, that I've first used as an internal explanation to highlight the problem and raise awareness of the problem.

## Example Case

The class name:

```php
class IsoUelnFeiCodeService
```

Do you have any idea what this class is doing by its name? Probably not.

So just in case you didn’t guess what this means: The class name is just a concatenation of abbreviated, horse domain specific identifiers. – What are you going to do if we need to add yet another identifier? Should we rename the class?

And what makes it a service? There has always been and still is a tendency to call everything a service or manager *Everything manages or does something, don’t tell the obvious, tell what it does!*

It also has ambiguous method names, here is just one of them:

```php
getIso3166Numeric(string $numeric): ?array
```

Just by the signature of the method, lacking any documentation of its behavior, what would you expect it to do? Why do you have to input something "numeric" when the method, assuming by its name, gets you something numeric back? But why does it return an array instead?

The underlying implementation actually returns the following. Luckily somebody put this information at least in the doc-block.

```php
/**
 * array{name: string, alpha2: string, alpha3: string, numeric: numeric-string, currency: string[]}
 */
```

So it actually returns a set of three, strictly speaking four, *different* types of data for a country:

- Country name
- Country IDs:
- Alphanumeric
- Numeric
- Its currency

Because it doesn’t return one clear type of data we can’t really give it a clear name, except we would break it completely up. The implementation is using a 3rd party library that returns this structure and just returns its array. Resolving this was not pragmatic at the time of refactoring this, therefore “data” is probably a sufficient name or part of the name for it.

## Refactoring it

The way the method is used in the code actually covers two cases that are not obvious.

* It is used for validation, which is a different purpose.
* It is used to get the 2 and 3 character country code.

And what is actually ISO3166? Without looking it up or remembering it, it is not possible to tell what this means.

The method was therefore, renamed to

```php
getCountryDataFromNumeric(string $numeric): ?array
```

and another method

```php
isValidNumericCountryCode(string $numeric): bool
```

was introduced.

The following section of code was part of the method `isISO()` and you probably will agree that it is kind of hard to understand quickly what is going on here and what the intention behind the code is.

```php
$startOk = ctype_alnum($start) || 'DE ' == $start;
$end = substr($code, 3);
$endOk = ctype_alnum($end) && 12 == strlen($end);
$deOk = ('3' == substr($code, 3, 1) || '4' == substr($code, 3, 1)) || ('DE ' != $start);
$countryCode = 'DE ' == $start ? 'DEU' : $start;
$countryOk = null != self::getIso3166Aplpa3($countryCode);
```

This was refactored to this and introduced small, but meaningful methods. You should be able to read in fluent English what exactly is validated here now.

```php
return self::hasValidStart($start)
    && self::hasValidEnd($end)
    && self::isGerman($code)
    && self::isValidCountry($countryCode);
```

The single responsibility principle does not only improve the technical quality of the code but also makes it better to understand. Some might argue that this is over-engineered, which might be true, but this argument doesn’t consider the importance of readability and understanding the code.

The class was not renamed at the time of writing this for good reasons, but it will be renamed to `HorseIdentifierHelper`. For the time being it will be the ambiguous "Helper", because it deals with two concerns: Validation and conversion, which should be split as well (Single Responsibility principle from the SOLID principles), but might not always be very pragmatic in this case.

The ultimate goal should be to have a `HorseIdentifierValidator` and a `HorseIdentifierConversion` class, using the validator, would improve the understandability greatly.

## Conclusion: Name your things properly

If you encounter strange names don't hesitate to change them. Refactoring naming is easy using today's powerful IDEs as long as the [locality of connascence](https://connascence.io/locality.html) is within the same system and does not go beyond the system's boundaries of the application by being exposed to external services.

> “You know you are working on clean code when each routine you read turns out to be pretty much what you expected. You can call it beautiful code when the code also makes it look like the language was made for the problem.”

— Ward Cunningham

**There is no excuse not to fix naming when you encounter bad naming!**
