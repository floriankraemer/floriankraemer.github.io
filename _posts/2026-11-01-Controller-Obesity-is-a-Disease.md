---
layout: post
title: 'Controller Obesity is Disease'
categories: software-architecture
tags: 
    - software-architecture
    - coupling
    - single-responsibility
    - SOLID
    - software-design
draft: true
published: false
comments: true
date: 2026-11-30
---

The shift toward "Fat Controllers" and procedural "God Services", very often leads to something called the Anemic Domain Model [1]. It might happen because framework conventions, ORM design, and deadline pressure heavily favor immediate speed over long-term architectural purity and therefore quality and long term velocity. I have seen this in small companies, in large companies creating enterprise software and when reviewing projects of cheap offshore companies. It is happening too often.

### When Models contain zero behavior, Invariants have nowhere to live

You may ask "What is an invariant?", this is just a business rule that has to be always true. Your application should enforce it and it should enforce it in the right place.

Rules like "an order cannot be canceled after it shipped" or "a balance cannot go negative" end up as `if` statements scattered across Service methods. The next developer who needs the same rule will reimplement it in another service, slightly differently, until nobody can say where the truth actually lives.

A lot of people probably don't know any better and simply use what they get out of the box because it feels convenient. Until the "entities" are just bags of data, the services are procedural scripts, and changing a single business rule means hunting through half the codebase.

### Convenience and/or a lack of knowledge

Writing a sequential, 200-line service script takes minutes. Designing rich domain aggregates, value objects, and bounded contexts requires deep domain analysis and extra boilerplate—time product managers rarely budget for. This in itself is a huge mistake, especially in complex domains, because the seemingly saved time will bite back in the form of bugs or hard to change, understand and maintain code.

Developers under pressure very often skip a proper design phase in this case, not realizing they'll just make their own life worse long term. Some developers, the bad ones in my opinion, entirely skip design on purpose, because they just want to write code. Well, writing code was never the hard part, it was and still is, even with AI, the design part that matters more, especially in complex domains.

### Readability

Procedural code is straightforward to read line-by-line. Standardizing on procedural services allows junior and senior engineers alike to onboard and trace execution without needing to understand Hexagonal Architecture, DDD, or complex abstractions.

### Bad Experiences

Teams burned by past over-engineered architectures (deep inheritance hierarchies, abstract factory bloat) often overcorrect into extreme procedural simplicity, favoring flat files until technical debt forces a redesign.

## Why Procedural Services are often Dominating

### Most Frameworks and Institutions don't teach Software Design

Many frameworks explicitly structure their documentation around Controller -> Service -> Repository. And very often developers naturally treat the Service or application layer as the default dumping ground for all business rules. 

This might be because the domain layer should be pure business logic, something the framework doesn't provide you. But as the sub-title of Eric Evans Domain Driven Design book correctly says "Tackling the complexity at the heart of the software". The heart is your domain model. **Not your framework.** Unfortunately a lot of developers, even seniors, do not know or intentionally discard it for some reason.

You do not need to do DDD at all, not even the tactical patterns of it, but you clearly should not stuff your business logic into your application layer.

### A lack of Education in Software Design

Aside from frameworks, I strongly believe that every developer should be able to see and address such issues. There are probably two more reasons why this is not happening: A lack of education regarding software design. Unfortunately this is almost not taught anywhere and when it is, then only very shallow. But good design is a key to good software quality. 

### A lack of Quality and a flawed Peception of it

Another reason could be a lack of quality and a feature-factory mindset in a company where they assume that pumping out features is a net win over delivering quality, which is a scientifically proven wrong assumption. The book Accelerate has proven this and good engineers like Frederick Brooks knew this already in 1970. Yet a lot manager in the IT industry still make the wrong assumption that quality is expensive and slow.

### ORMs Seem to Be Convenient

Object-Relational Mappers (ORMs) encourage treating database entities as dumb data bags (DTOs with getters and setters). Most ORMs generate or expect classes that mirror table columns one-to-one, with public setters so the persistence layer can hydrate them freely. That mapping is convenient for CRUD—but it quietly teaches a wrong mental model: *the entity is the row, not the business concept*.

## An Example

Here is a simplified e-commerce order cancellation flow refactored from a procedural Fat Service into a Rich Domain Model. Though it is simple, it should communicate the idea. What I usually see are hundreds if not thousands of lines in controllers and in the worst case in single methods.

Both examples share the same `OrderStatus` enum so the comparison isolates behavior encapsulation—not type cleanup:

{% tabs obesity-order-status %}

{% tab obesity-order-status PHP %}
```php
<?php

enum OrderStatus
{
    case Pending;
    case Shipped;
    case Completed;
    case Canceled;
}
```
{% endtab %}

{% tab obesity-order-status C# %}
```csharp
public enum OrderStatus
{
    Pending,
    Shipped,
    Completed,
    Canceled
}
```
{% endtab %}

{% tab obesity-order-status Java %}
```java
public enum OrderStatus {
    Pending,
    Shipped,
    Completed,
    Canceled
}
```
{% endtab %}

{% endtabs %}

### The Anemic Model & Fat Service (Procedural)

Business rules, validation, and property mutations live entirely inside the application service layer, while the domain class acts as a simple data container.

{% tabs obesity-anemic %}

{% tab obesity-anemic PHP %}
```php
<?php

// Anemic Domain Model: Dumb data bag with public setters
class Order
{
    public int $id;
    public float $totalAmount;
    public OrderStatus $status = OrderStatus::Pending;
    public DateTimeImmutable $createdAt;
}

// Fat Service: Holds all business logic and state mutation rules
final class OrderService
{
    public function __construct(private readonly IOrderRepository $repository) {}

    public function cancelOrder(int $orderId): void
    {
        $order = $this->repository->getById($orderId);
        if ($order === null) {
            throw new RuntimeException('Order not found.');
        }

        // Leaked Business Rules: Checking business validity directly in the service
        if ($order->status === OrderStatus::Shipped || $order->status === OrderStatus::Completed) {
            throw new RuntimeException('Cannot cancel an order that has already shipped.');
        }

        $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
        if ((int) $order->createdAt->diff($now)->format('%a') > 30) {
            throw new RuntimeException('Orders older than 30 days cannot be canceled.');
        }

        // Direct state mutation
        $order->status = OrderStatus::Canceled;

        $this->repository->update($order);
    }
}
```
{% endtab %}

{% tab obesity-anemic C# %}
```csharp
// Anemic Domain Model: Dumb data bag with public setters
public class Order
{
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public DateTime CreatedAt { get; set; }
}

// Fat Service: Holds all business logic and state mutation rules
public class OrderService
{
    private readonly IOrderRepository _repository;
    public OrderService(IOrderRepository repository) => _repository = repository;

    public void CancelOrder(int orderId)
    {
        var order = _repository.GetById(orderId)
            ?? throw new KeyNotFoundException("Order not found.");

        // Leaked Business Rules: Checking business validity directly in the service
        if (order.Status == OrderStatus.Shipped || order.Status == OrderStatus.Completed)
            throw new InvalidOperationException("Cannot cancel an order that has already shipped.");

        if ((DateTime.UtcNow - order.CreatedAt).TotalDays > 30)
            throw new InvalidOperationException("Orders older than 30 days cannot be canceled.");

        // Direct state mutation
        order.Status = OrderStatus.Canceled;

        _repository.Update(order);
    }
}
```
{% endtab %}

{% tab obesity-anemic Java %}
```java
// Anemic Domain Model: Dumb data bag with public setters
public class Order {
    private int id;
    private BigDecimal totalAmount;
    private OrderStatus status = OrderStatus.Pending;
    private Instant createdAt;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

// Fat Service: Holds all business logic and state mutation rules
public class OrderService {
    private final IOrderRepository repository;

    public OrderService(IOrderRepository repository) {
        this.repository = repository;
    }

    public void cancelOrder(int orderId) {
        Order order = repository.getById(orderId);
        if (order == null) {
            throw new NoSuchElementException("Order not found.");
        }

        // Leaked Business Rules: Checking business validity directly in the service
        if (order.getStatus() == OrderStatus.Shipped || order.getStatus() == OrderStatus.Completed) {
            throw new IllegalStateException("Cannot cancel an order that has already shipped.");
        }

        if (Duration.between(order.getCreatedAt(), Instant.now()).toDays() > 30) {
            throw new IllegalStateException("Orders older than 30 days cannot be canceled.");
        }

        // Direct state mutation
        order.setStatus(OrderStatus.Canceled);

        repository.update(order);
    }
}
```
{% endtab %}

{% endtabs %}

### The Rich Domain Model & Thin Service (Encapsulated)

The domain entity guards its own invariants with private setters and meaningful domain methods. The service layer drops to pure infrastructure orchestration.

Notice that `Cancel` takes the current time as a parameter instead of reading `DateTime.UtcNow` internally—so unit tests can fix "now" without depending on the system clock.

{% tabs obesity-rich %}

{% tab obesity-rich PHP %}
```php
<?php

// Rich Domain Model: Enforces business invariants internally
final class Order
{
    private int $id;
    private float $totalAmount;
    private OrderStatus $status;
    private DateTimeImmutable $createdAt;

    public function getId(): int
    {
        return $this->id;
    }

    public function getTotalAmount(): float
    {
        return $this->totalAmount;
    }

    public function getStatus(): OrderStatus
    {
        return $this->status;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    // Domain method encapsulates business rules and guards valid states
    public function cancel(DateTimeImmutable $now): void
    {
        $this->OrderIsNotShippedOrCompleted();
        $this->OrderIsWithinCancelWindow($now);

        $this->status = OrderStatus::Canceled;
    }

    private function OrderIsNotShippedOrCompleted(): void
    {
        if ($this->status === OrderStatus::Shipped || $this->status === OrderStatus::Completed) {
            throw new DomainException('Cannot cancel an order that has already shipped.');
        }
    }

    private function OrderIsWithinCancelWindow(DateTimeImmutable $now): void
    {
        if ((int) $this->createdAt->diff($now)->format('%a') > 30) {
            throw new DomainException('Orders older than 30 days cannot be canceled.');
        }
    }
}

// Thin Application Service: Coordinates persistence and domain execution
final class OrderService
{
    public function __construct(private readonly IOrderRepository $repository) {}

    public function cancelOrder(int $orderId): Result
    {
        $order = $this->repository->getById($orderId);
        if ($order === null) {
            return Result::fail('Order not found.');
        }

        // Service delegates execution directly to the entity
        $order->cancel(new DateTimeImmutable('now', new DateTimeZone('UTC')));

        $this->repository->update($order);
        return Result::ok();
    }
}
```
{% endtab %}

{% tab obesity-rich C# %}
```csharp
// Rich Domain Model: Enforces business invariants internally
public class Order
{
    public int Id { get; private set; }
    public decimal TotalAmount { get; private set; }
    public OrderStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }

    // Domain method encapsulates business rules and guards valid states
    public void Cancel(DateTime now)
    {
        OrderIsNotShippedOrCompleted();
        OrderIsWithinCancelWindow(now);

        Status = OrderStatus.Canceled;
    }

    private void OrderIsNotShippedOrCompleted()
    {
        if (Status == OrderStatus.Shipped || Status == OrderStatus.Completed)
            throw new DomainException("Cannot cancel an order that has already shipped.");
    }

    private void OrderIsWithinCancelWindow(DateTime now)
    {
        if ((now - CreatedAt).TotalDays > 30)
            throw new DomainException("Orders older than 30 days cannot be canceled.");
    }
}

// Thin Application Service: Coordinates persistence and domain execution
public class OrderService
{
    private readonly IOrderRepository _repository;
    public OrderService(IOrderRepository repository) => _repository = repository;

    public Result CancelOrder(int orderId)
    {
        var order = _repository.GetById(orderId);
        if (order is null) {
            return Result.Fail("Order not found.");
        }

        // Service delegates execution directly to the entity
        order.Cancel(DateTime.UtcNow);

        _repository.Update(order);
        return Result.Ok();
    }
}
```
{% endtab %}

{% tab obesity-rich Java %}
```java
// Rich Domain Model: Enforces business invariants internally
public class Order {
    private int id;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private Instant createdAt;

    public int getId() { return id; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public OrderStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }

    // Domain method encapsulates business rules and guards valid states
    public void cancel(Instant now) {
        OrderIsNotShippedOrCompleted();
        OrderIsWithinCancelWindow(now);

        status = OrderStatus.Canceled;
    }

    private void OrderIsNotShippedOrCompleted() {
        if (status == OrderStatus.Shipped || status == OrderStatus.Completed) {
            throw new DomainException("Cannot cancel an order that has already shipped.");
        }
    }

    private void OrderIsWithinCancelWindow(Instant now) {
        if (Duration.between(createdAt, now).toDays() > 30) {
            throw new DomainException("Orders older than 30 days cannot be canceled.");
        }
    }
}

// Thin Application Service: Coordinates persistence and domain execution
public class OrderService {
    private final IOrderRepository repository;

    public OrderService(IOrderRepository repository) {
        this.repository = repository;
    }

    public Result cancelOrder(int orderId) {
        Order order = repository.getById(orderId);
        if (order == null) {
            return Result.fail("Order not found.");
        }

        // Service delegates execution directly to the entity
        order.cancel(Instant.now());

        repository.update(order);
        return Result.ok();
    }
}
```
{% endtab %}

{% endtabs %}

## The Advantages

So what are the advantages of this? There are quite a few: The structural differences are that Public setters are replaced with private set, preventing external code from placing the entity into an invalid state. That you can test `Order.Cancel(now)` in pure unit tests with zero mocks (no need to mock `IOrderRepository` or freeze the system clock). And the model becomes the single Source of Truth: If order cancellation rules change, you update `Order.cs` instead of searching through multiple services where order state might be mutated.

## When to Use Which

Rich domain models are not free. They cost analysis, encapsulation, and a bit more ceremony than a public-setter entity plus a service script. Given the fact that analysis and an understanding of the problem space should happen anyway before any code is written, this shouldn't be a problem, but it very often is, because that analysis gets skipped in favor of starting to write code right away.

For pure CRUD—forms that create, read, update, and delete records with little or no invariant beyond "the field is required", an anemic model and thin procedural services, are often fine and cut overhead you would never repay.

Reach for a rich model when rules compound: state transitions, time windows, cross-field invariants, or the same business rule showing up in more than one place.

That is exactly where fat services stop being convenient and start becoming the disease this post is about.

[1] https://martinfowler.com/bliki/AnemicDomainModel.html