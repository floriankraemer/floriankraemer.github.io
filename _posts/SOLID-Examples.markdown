<!--

### LSP Violation Example

This principle addresses **unintended changes of behavior in sub types**. Given we have two classes, Alpha and Beta, both extending an abstract base class or implementing the same interface, getPositiveInteger() as follows, it will break the behavior, despite being valid code:

```java
class Alpha implements PositiveIntegerProvider {
    @Override
    public int getPositiveInteger() {
        return 2 + 2;
    }
}

class Beta implements PositiveIntegerProvider {
    @Override
    public int getPositiveInteger() {
        int result = 2 - 4;
    }
}
```

Even the type check here does not prevent a change in behavior by returning a negative number in this case. Solutions:

1. Return a value object "PositiveNumber" as data type, that does the check internally and does not accept negative values. Bonus: This also communicates intent and also fulfills SRP. You can immediately tell by the name of the type what it does.

2. Declare a "@throws NegativeResultException" in the docblock of the interface or parent class and hope (or enforce it via an architectural rule checker) everyone implements it or the static analyzer is capable of finding that it is not thrown.

```java
// Throws exception from value object
public PositiveInteger getPositiveInteger()
{
    return PositiveInteger::fromInteger(2 - 4);
}
```

It should be impossible, at least much harder, to change the behavior of the method to an unintended behavior now.

-->