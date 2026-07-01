---
layout: post
title: 'Der Wert von Value Objects'
categories: software-architecture
tags: 
    - software-architecture
    - oop
draft: true
published: false
comments: true
date: 2026-04-30T21:15:31.000Z
---

Es überrascht mich immer noch, wie viele Menschen Value Objects nicht verstehen oder nicht einsetzen. Ich bin mir über die Gründe nicht sicher, aber ich versuche zu erklären, warum sie nützlich sind. Manche scheinen zu glauben, dass Value Objects nur dann sinnvoll sind, wenn eine Kombination aus zwei oder mehr Werten vorliegt – das ist falsch. Dass auf Value Objects verzichtet wird, gilt sogar als Architekturgeruch mit dem Namen „Primitive Obsession“.

Value Objects sind sehr nützlich, um Geschäftsregeln und Einschränkungen durchzusetzen. Und nein, das ist nicht dasselbe wie Validierung – darüber aber ein anderes Mal. Außerdem helfen sie, Fehler zu vermeiden.

## Der Wert von Value Objects am Beispiel

Angenommen, wir haben diesen Code: Was ist deiner Meinung nach vermutlich falsch daran? Nimm dir einen Moment und denk über die reine Mathematik hinaus.

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

Ich hoffe, du hast das logische Problem erkannt: Die Methode heißt glücklicherweise „get**Positive**Integer“, aber `2 - 4` liefert offensichtlich `-2`. Der Typ ist hier `int`, und du bekommst also eine negative Zahl zurück, obwohl das nicht der Absicht der Methode entspricht. In diesem Fall hast du Glück, dass der Methodenname die Absicht ausdrückt; leider ist das oft nicht der Fall, und diese Information bleibt verborgen.

Das verletzt das [Liskovsche Substitutionsprinzip](https://de.wikipedia.org/wiki/Liskovsches_Substitutionsprinzip): Der Code bricht das Verhalten, obwohl er gültig ist. Selbst die Typprüfung verhindert hier nicht, dass sich das Verhalten ändert, wenn eine negative Zahl zurückgegeben wird.

Wenn du den beabsichtigten Vertrag so verstehst, dass „der Rückgabewert eine positive Ganzzahl ist“ (aus Name, Dokumentation oder Teamkonvention), dann schwächt Beta diese Nachbedingung im Vergleich zu dem, was Aufrufer bei `IExample` annehmen dürfen. Ein Programm, das mit `Alpha` korrekt ist, kann fehlerhaft werden, wenn du `Beta` einsetzt – ein klassischer LSP-Verstoß bezogen auf diesen **verhaltensbezogenen Vertrag**.

Streng genommen ist der **formale** Vertrag des Typsystems im Sinne des LSP korrekt, aber es gibt einen **verhaltensbezogenen** Bruch. Das LSP besagt streng genommen „nur“, dass Untertypen überall dort einsetzbar sein müssen, wo der Basistyp erwartet wird, ohne ein korrektes Programm zu zerstören – wobei „korrekt“ durch die tatsächliche Spezifikation der Abstraktion definiert ist (oft Vor- und Nachbedingungen, Invarianten), nicht nur durch das, was kompiliert.

Wie beheben wir das?

### Zwei Wege zur Behebung

1. Gib ein Value Object „PositiveNumber“ als Datentyp zurück, das die Prüfung intern macht und negative Werte nicht akzeptiert. Bonus: Das drückt die Absicht aus und erfüllt auch das SRP. Am Typnamen erkennst du sofort, was gemeint ist.

2. Dokumentiere `NegativeResultException` mit `/// <exception cref="NegativeResultException">` an der Schnittstelle oder Basisklasse und **hoffe** (oder erzwinge es mit einem Architekturregel-Checker), dass alle es umsetzen oder der statische Analyzer erkennt, dass die Ausnahme nicht geworfen wird. Das ist nicht zu empfehlen, weil es nicht ausdrücklich erzwungen wird.

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
                "Der Wert {$number} ist keine positive Zahl"
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
                $"Der Wert {number} ist keine positive Zahl"
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
                "Der Wert " + number + " ist keine positive Zahl"
            );
        }

        return new PositiveInteger(number);
    }
}
```
{% endtab %}

{% endtabs %}

Aktualisieren wir den bestehenden Code:

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

Jetzt ist das LSP erfüllt, und es ist unmöglich, einen Wert (bzw. ein Objekt) zurückzugeben, der nicht der Erwartung entspricht.

### Schlankere `PositiveInteger`-Typen in C# und Java

In **C#** reduziert ein **`public readonly record struct`** viel Boilerplate im Vergleich zu einer handgeschriebenen Klasse – vor allem bei Unveränderlichkeit und struktureller Gleichheit. Eine minimale Positionsdeklaration wie `public readonly record struct PositiveInteger(int Value);` ist **kein** Ersatz für den zuvor abgesicherten Typ: Der Compiler erzeugt einen **öffentlichen** Konstruktor, sodass `new PositiveInteger(-1)` kompilieren und deine Regel umgehen würde.

In **Java** gilt dieselbe Falle für ein kompaktes **`record PositiveInteger(int value)`**: Validierung im *kompakten Konstruktor* lässt den kanonischen Konstruktor **öffentlich**, also ist `new PositiveInteger(-1)` erlaubt. Um der C#-Absicherung zu entsprechen, verwendet der Java-Tab eine **`final`-Klasse** mit **privatem** Konstruktor und einer statischen **`fromInt`-Factory**.

{% tabs vo-record-struct %}

{% tab vo-record-struct C# %}
```csharp
public readonly record struct PositiveInteger
{
    public int Value { get; }

    // Privater Konstruktor verhindert Umgehung der Geschäftsregeln
    private PositiveInteger(int value) => Value = value;

    public static PositiveInteger FromInt(int value)
    {
        if (value < 0) {
            throw new ArgumentException(
                $"Der Wert {value} ist keine positive Zahl", nameof(value)
            );
        }

        return new PositiveInteger(value);
    }

    // Optional: Implizite Konvertierung zu int für klarere Nutzung
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
                "Der Wert " + value + " ist keine positive Zahl"
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

**C#** — Mit dieser `readonly record struct`-Form bekommst du:

1. **Unveränderlichkeit**: `readonly` am Struct und das `Value`-Accessor-Muster verhindern Mutation nach der Konstruktion.
2. **Performance**: Als Werttyp vermeidet das Struct oft eine separate Heap-Allokation für Lokale und Parameter und kann inline in anderen Objekten liegen – in der Regel weniger GC-Druck als bei einer Klasse, vorbehaltlich Boxing und weiterer Einschränkungen.
3. **Strukturelle Gleichheit**: Der Compiler erzeugt weiterhin `Equals`, `GetHashCode` und `==`/`!=` für den Record-Teil, sodass `PositiveInteger.FromInt(5) == PositiveInteger.FromInt(5)` ohne handgeschriebene Gleichheitsmitglieder gilt.

**Java** — Die obige `final`-Klasse tauscht Record-Komfort gegen eine harte Grenze:

1. **Unveränderlichkeit**: `private final int value` und kein Setter entsprechen derselben Idee wie im C#-Beispiel.
2. **Performance**: Instanzen sind normale Heap-Objekte (Java hat hier kein `struct`-Pendant); für typische Value-Object-Größen ist das in der Regel akzeptabel.
3. **Strukturelle Gleichheit**: Du behältst explizites `equals` und `hashCode`, damit Kollektionen und Vergleiche zwei Instanzen mit demselben Wert als gleich behandeln – so wie es ein `record` generieren würde, zum Preis des öffentlichen kanonischen Konstruktors, den du vermeiden wolltest.

## Ein weiteres Beispiel

Das ist mir und anderen, die ich kenne, wirklich passiert; es ist ein sehr reales Beispiel. Schauen wir uns diese Methode an. Sieht sie richtig aus?

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

Falsch. Achte auf die Benennung der Argumente, dann siehst du, welchen Fehler du gerade gemacht hast.

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

So ein Fehler passiert schnell; ich habe ihn bei anderen mehrfach gesehen und selbst schon begangen. Es könnte noch schlimmer sein: Die Argumente hießen nur `user1` und `user2` – dann ist die Verwechslung noch wahrscheinlicher.

Ein Value Object verhindert das und macht es explizit; die unterschiedlichen Typen verhindern die Verwechslung. Diesen Fehler kannst du nicht mehr machen:

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

Beachte außerdem, dass wir die Benennung an die tatsächliche Sprache der Domäne angepasst haben, statt den Begriff `User` zu verwenden. Viele Entwickler nennen Akteure gern `User`, egal welcher Kontext es ist.

## Noch ein Beispiel gegen Primitive Obsession

Primitive Obsession entsteht, wenn du auf elementare Datentypen (Strings, Ganzzahlen, Fließkommazahlen) setzt, um komplexe Domänenkonzepte mit eigenen Regeln und Logik abzubilden. Das ist problematisch, weil Primitive „dumm“ sind: Ein String weiß nicht, dass er eine gültige E-Mail-Adresse sein soll, und ein `int` weiß nicht, dass ein „Preis“ nicht negativ sein darf. Dadurch verteilst du Validierungslogik im ganzen Code, erhöhst das Risiko falsch geordneter Argumente und erschwerst Lesbarkeit und Wartung.

Value Objects stellen sicher, dass die Invariante – die Geschäftsregeln deiner Value Objects – überall dort gilt, wo du den Wert nutzt. Wenn deine Regel lautet, niemals negative Preise zu haben, und du dafür Ganzzahlen oder Fließkommazahlen nimmst (keine Floats für Geld!), musst du diese Prüfung an vielen Stellen wiederholen, während es sinnvoll ist, das Konzept im Preisobjekt selbst zu kapseln.

### Das „obsessive“ Beispiel

In dieser Version verwenden wir einen einfachen String für eine E-Mail. Sieh, wie die Klasse `User` die Last tragen muss, zu validieren, was eine „E-Mail“ eigentlich ist.

{% tabs vo-user-primitive %}

{% tab vo-user-primitive PHP %}
```php
<?php

class User
{
    public function __construct(
        public string $name,
        /** Problem: Das könnte „keine E-Mail“, „ „ oder null sein. */
        public ?string $email
    ) {}

    public function updateEmail(string $newEmail): void
    {
        if ($newEmail === '' || trim($newEmail) === '' || !str_contains($newEmail, '@')) {
            throw new InvalidArgumentException('Ungültige E-Mail');
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
    // Problem: Das könnte „keine E-Mail“, „ „ oder null sein.
    public string Email { get; set; } 

    public void UpdateEmail(string newEmail)
    {
        if (string.IsNullOrWhiteSpace(newEmail) || !newEmail.Contains("@"))
            throw new ArgumentException("Ungültige E-Mail"
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
    // Problem: Das könnte „keine E-Mail“, „ „ oder null sein.
    public String email;

    public void updateEmail(String newEmail) {
        if (newEmail == null || newEmail.isBlank() || !newEmail.contains("@")) {
            throw new IllegalArgumentException("Ungültige E-Mail");
        }
        this.email = newEmail;
    }
}
```
{% endtab %}

{% endtabs %}

### Das refaktorierte Beispiel

Mit einem Value Object kapselst du die Logik. Sobald ein `EmailAddress`-Objekt existiert, kannst du sicher sein, dass es gültig ist – egal wohin es im System gereicht wird.

Wenn du den Objektinitialisierer nutzt (z. B. `new EmailAddress { Value = "not-an-email" }`), kannst du die Konstruktorlogik umgehen, weil `Value` eine Init-Property ist – deshalb machen wir sie privat.

{% tabs vo-email-refactor %}

{% tab vo-email-refactor PHP %}
```php
<?php

final readonly class EmailAddress
{
    private function __construct(public string $value) {}

    public static function fromString(string $value): self
    {
        // Je nach Anforderungen solltest du hier strenger prüfen
        if (trim($value) === '' || !str_contains($value, '@')) {
            throw new InvalidArgumentException('Ungültiges E-Mail-Format.');
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
        // Je nach Anforderungen solltest du hier strenger prüfen
        if (string.IsNullOrWhiteSpace(value) || !value.Contains("@"))
            throw new ArgumentException("Ungültiges E-Mail-Format.");
            
        Value = value;
    }
    
    // Optional: Implizite Konvertierung für klarere Syntax
    public static implicit operator string(EmailAddress email) => email.Value;
}

public class User
{
    public string Name { get; set; }
    // Der Typ selbst garantiert die Gültigkeit
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
        // Je nach Anforderungen solltest du hier strenger prüfen
        if (value == null || value.isBlank() || !value.contains("@")) {
            throw new IllegalArgumentException("Ungültiges E-Mail-Format.");
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

Die Refaktorisierung von Primitiven zu eigenen Typen verbessert die Typsicherheit grundlegend: In einer Methodensignatur lassen sich Benutzername und E-Mail-Adresse nicht mehr versehentlich vertauschen – der Compiler verbietet es. Zentralisierte Logik folgt daraus: Änderungen an Validierungsregeln, etwa ein neues Regex-Muster, landen im Konstruktor des Typs statt verstreut in UI- und Datenbankschicht.

Über die technischen Leitplanken hinaus steigt die Lesbarkeit stark; ein Typ `EmailAddress` transportiert die Domänenabsicht sofort und gibt späteren Entwicklern viel mehr Kontext als ein generischer, „dummer“ String.

## Gleichheit von Value Objects

Entscheidend: **Ein Value Object wird durch seine Daten definiert, nicht durch seine Identität**. In einer gewöhnlichen Klasse gelten zwei Objekte typischerweise nur dann als gleich, wenn sie dieselbe Speicherstelle belegen – das ist Referenzgleichheit. Bei einem echten Value Object muss der Ausdruck 5 == 5 immer wahr sein, unabhängig davon, ob es unterschiedliche Instanzen im System sind.

Ohne Überschreiben der Gleichheitslogik (oder ohne C#-`record`) hast du im Grunde nur ein „Wrapper-Objekt“. Ohne diese **strukturelle Gleichheit** lassen sich die Objekte nicht zuverlässig in Mengen, Wörterbüchern oder Vergleichen nutzen – damit entfällt der architektonische Nutzen, sie als Werte zu behandeln.

Wichtig: **Validierung prüft, ob Eingaben korrekt sind; Value Objects stellen sicher, dass Daten im System korrekt bleiben**. Die Ausnahmen hier sollen nicht als UI-Fehlermeldung nach außen wandern, sondern dir zeigen, dass etwas schiefgegangen ist, falls diese Ausnahme überhaupt auftritt.

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
                "Der Wert {$number} ist keine positive Zahl"
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
                $"Der Wert {number} ist keine positive Zahl"
            );
        }

        return new PositiveInteger(number);
    }

    public override bool Equals(object? obj) => obj is PositiveInteger other && Equals(other);

    public bool Equals(PositiveInteger? other) =>
        other is not null && _number == other._number;

    public override int GetHashCode() => _number;

    // Diese Objekte schützen Daten; für Arithmetik können Operatorüberladungen (z. B. +) nötig sein.
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
                "Der Wert " + number + " ist keine positive Zahl"
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

## Es reicht nicht, nur Code zu schreiben

Code muss die semantische Bedeutung dessen widerspiegeln, was du modellierst, und eindeutig sein.

Sender und Empfänger sind semantisch gewiss nicht dasselbe; es sind völlig verschiedene Konzepte. Um logische Fehler zu vermeiden, solltest du sie im Code ebenso explizit abbilden statt zu sagen: „Ach, das sind doch alles nur Ganzzahlen.“

Kurz zusammengefasst:

* Ein Value Object wird durch seine Daten definiert, nicht durch seine Identität.
* Validierung prüft, ob Eingaben korrekt sind; Value Objects stellen sicher, dass Daten im System korrekt bleiben.
* Value Objects kapseln idealerweise Konzepte aus deinem Domänenmodell und setzen Invarianten durch.
* Value Objects können mehr als einen internen Wert haben, z. B. kann `Money` aus Betrag und Währung bestehen.
