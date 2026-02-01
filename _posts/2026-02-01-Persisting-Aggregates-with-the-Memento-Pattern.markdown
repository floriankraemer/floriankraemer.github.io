---
layout: post
title: 'Persisting Aggregates with the Memento Pattern and embracing Simplicity'
categories: software-architecture
tags: 
    - aggregate-pattern
    - patterns
    - coupling
    - software-architecture
    - PHP
    - PDO
    - doctrine
    - GoF
draft: false
published: true
comments: true
date: 2026-01-12T13:35:10.000Z
---

This article will show how to use the Memento Pattern to persist aggregates just using plain old PDO.

Why just PDO? Because of *simplicity*. Are you doing anything complex here? It is just simple inserts and updates, no? Yes, there can be complex cases, but unless you do something very specific it is unlikely.

I've used [cloc](https://github.com/AlDanial/cloc) to measure the pure number of lines of code, no comments and empty lines were counted.

* The Doctrine DBAL package has 25959 lines of code.
* The Doctrine ORM package has 32786 lines of code and depends on doctrine/dbal.

And there are of course more dependencies. With just these two packages you are already using ~58.000 lines of code that are now **your liability**.

The biggest downside here would be that you use some SQL dialect specific functions, but how often do you do that for inserts and updates and even if you have to use them, how often do you actually change your DB system? And even if you do: How much effort will it be to change this? Given that your repositories should implement in any case an interface, you can easily change or add additional repository implementations if you have a need to do so later on.

I think one of our biggest problems these days is that we throw a giant library on everything just because we can and because the resources are there. Most projects these days are not that limited in memory and computing power. You could now argue that those libs make it easier to use DB systems. And last: It is of course convenient.

While I had only one project in the past ~22 years that migrated from one DB dialect to another, I've seen more issues with switching between persistence libraries and by that I mean even going from one major version to another major version of the same library. It won't happen often but at least in my personal experience (I'm not saying this is absolute!) a long-lived project is more likely to run into migration issues with the library than into the need to switch DB systems.

If you know why you use DDD aggregates and use them correctly, there might be but there shouldn't necessarily be a match with your DB structure. I would *never* design a system with database structures first in mind these days unless it is very, very data centric. Also, to store and read your aggregates, you will very likely not need very complex and DB specific functions. You could even store them in a specific table and use triggers to modify other tables based on an insert or update to it.

Let's compare the code and see if we can save anything regarding complexity, technical or cognitive.

## Why not just an Array?

* An array is not typed.
* An array might have missing keys.
* You'll need PHPStans array shape in the doc-block to make it more accessible and checkable.

Using a simple plain old PHP object like the Memento gives you strong types out of the box and defines the shape automatically by using an object. Instead of writing PHPStans array shape annotation, you can also simply write a proper object. I see no reason how the array would be more beneficial in this case.

Some people might argue about the memory and disk space the class might take. I don't think this is a concern here unless you do something with extreme performance concerns or in a very limited environment like working on an embedded system with very limited memory and processing power.

## Why not using a persistence entity directly?

You would directly couple your domain model to the persistence layer. Using the memento, that is part of your domain model layer, will basically inverse that dependency. Your infrastructure / persistence layer will now have to know about the domain, which is perfectly fine.

### PDO Repository

```php
// persist order
$memento = $order->createMemento();
$data = $memento->toArray();

$stmt = $this->pdo->prepare(
    'INSERT OR REPLACE INTO orders (id, customer, status) VALUES (:id, :customer, :status)'
);
$stmt->execute([
    ':id' => $data['id'],
    ':customer' => $data['customer'],
    ':status' => $data['status'],
]);
```

### Doctrine DBAL Repository

```php
// persist order
$memento = $order->createMemento();
$data = $memento->toArray();

$this->connection->executeStatement(
    'INSERT OR REPLACE INTO orders (id, customer, status) VALUES (:id, :customer, :status)',
    [
        'id' => $data['id'],
        'customer' => $data['customer'],
        'status' => $data['status'],
    ]
);
```

### Doctrine ORM Repository

```php
// persist order
$memento = $order->createMemento();
$data = $memento->toArray();

$entity = new OrderEntity(
    $data['id'],
    $data['customer'],
    $data['status']
);

$this->entityManager->persist($entity);
$this->entityManager->flush(); // writes to DB
```

## Comparison

| Approach          | Style                         | Pros                                                                 | Cons                                                                          |
| ----------------- | ----------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **PDO**           | Raw SQL                       | Simple, no dependencies, efficient updates with UPSERT               | Lots of boilerplate, no schema abstraction                                    |
| **Doctrine DBAL** | SQL with convenience          | Cleaner, portable, parameter typing                                  | Still SQL-heavy                                                               |
| **Doctrine ORM**  | Entity mapping & Unit of Work | Very expressive, tracks changes, integrates well with DDD aggregates | More setup (entities, mappings, proxies), may be heavy for simple persistence |

## Example: Order Aggregate

For the sake of keeping this blog article relatively short, I'll include only the most relevant excerpts here.

### Complete Working Example

I've created a complete, runnable implementation that demonstrates all the concepts discussed in this article. The repository includes:

- The full Order aggregate with value objects (`OrderId`, `Customer`, `OrderStatus`)
- The `OrderMemento` class with JSON serialization
- A PDO-based repository implementation with transactions
- SQLite database schema
- Unit and integration tests
- Docker setup for easy local development

**Check out the repository: [github.com/floriankraemer/php-memento-example](https://github.com/floriankraemer/php-memento-example)**

### Class Diagram

```mermaid
classDiagram
    class Order {
        -orderId: OrderId
        -customer: Customer
        -status: OrderStatus
        -items: OrderItem[]
        -shippingAddress: ShippingAddress?
        +create(orderId: OrderId, customer: Customer): Order
        +addItem(product: string, quantity: int, price: int): void
        +setShippingAddress(street: string, city: string, state: string, postalCode: string, country: string): void
        +createMemento(): OrderMemento
        +createFromMemento(memento: OrderMemento): Order
    }

    class OrderItem {
        -product: string
        -quantity: int
        -price: int
        +fromArray(data: array): OrderItem
        +toArray(): array
        +jsonSerialize(): array
    }

    class ShippingAddress {
        -street: string
        -city: string
        -state: string
        -postalCode: string
        -country: string
        +fromArray(data: array): ShippingAddress
        +toArray(): array
        +jsonSerialize(): array
    }

    class OrderMemento {
        -id: string
        -customer: string
        -status: string
        -items: OrderItem[]
        -shippingAddress: ShippingAddress?
        +fromArray(data: array): OrderMemento
        +toArray(): array
        +jsonSerialize(): array
        +fromJson(json: string): OrderMemento
    }

    class OrderRepositoryInterface {
        <<interface>>
        +persist(order: Order): void
        +restore(id: string, version: int?): Order?
    }

    class OrderRepository {
        -pdo: PDO
        +persist(order: Order): void
        +restore(id: string, version: int?): Order?
    }

    Order "1" *-- "0..*" OrderItem : contains
    Order "1" *-- "0..1" ShippingAddress : has
    Order ..> OrderMemento : creates / restores from
    OrderRepository ..|> OrderRepositoryInterface : implements
    OrderRepository ..> OrderMemento : uses for persistence
    OrderRepository ..> Order : persists / restores
```

### SQL Tables

```sql
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id VARCHAR(36) NOT NULL,
    product VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    UNIQUE(order_id, product)
);

CREATE TABLE order_shipping_address (
    order_id VARCHAR(36) PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE order_mementos (
    id VARCHAR(36) NOT NULL,
    version INTEGER NOT NULL,
    snapshot TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, version)
);
```

### The Memento

The `OrderMemento` is a readonly class that captures the complete state of an Order at a specific point in time. It implements `JsonSerializable` for easy persistence:

```php
final readonly class OrderMemento implements \JsonSerializable
{
    /** @param OrderItem[] $items */
    public function __construct(
        private readonly string $id,
        private readonly string $customer,
        private readonly string $status,
        private readonly array $items,
        private readonly ?ShippingAddress $shippingAddress,
    ) {}

    public static function fromArray(array $data): self
    {
        $items = array_map(
            static fn (array $itemData): OrderItem => OrderItem::fromArray($itemData),
            $data['items']
        );

        $shippingAddress = isset($data['shippingAddress'])
            ? ShippingAddress::fromArray($data['shippingAddress'])
            : null;

        return new self($data['id'], $data['customer'], $data['status'], $items, $shippingAddress);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer' => $this->customer,
            'status' => $this->status,
            'items' => array_map(static fn (OrderItem $item): array => $item->toArray(), $this->items),
            'shippingAddress' => $this->shippingAddress?->toArray(),
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public static function fromJson(string $json): self
    {
        return self::fromArray(json_decode($json, true, 512, JSON_THROW_ON_ERROR));
    }
}
```

### The Order Aggregate

The `Order` aggregate uses value objects for type safety and encapsulates its state. It provides `createMemento()` and `createFromMemento()` methods:

```php
final class Order
{
    /** @var OrderItem[] */
    private array $items = [];
    private ?ShippingAddress $shippingAddress = null;
    private OrderId $orderId;
    private Customer $customer;
    private OrderStatus $status;

    private function __construct() {}

    public static function create(OrderId $orderId, Customer $customer): self
    {
        $order = new self();
        $order->orderId = $orderId;
        $order->customer = $customer;
        $order->status = OrderStatus::new();

        return $order;
    }

    public function createMemento(): OrderMemento
    {
        return new OrderMemento(
            $this->orderId->value(),
            $this->customer->value(),
            $this->status->value(),
            $this->items,
            $this->shippingAddress
        );
    }

    public static function createFromMemento(OrderMemento $memento): self
    {
        $data = $memento->toArray();
        $order = new self();
        $order->orderId = new OrderId($data['id']);
        $order->customer = new Customer($data['customer']);
        $order->status = new OrderStatus($data['status']);
        $order->items = array_map(
            static fn (array $itemData): OrderItem => OrderItem::fromArray($itemData),
            $data['items']
        );
        $order->shippingAddress = isset($data['shippingAddress'])
            ? ShippingAddress::fromArray($data['shippingAddress'])
            : null;

        return $order;
    }

    // ... other methods like addItem(), setShippingAddress()
}
```

### The Repository Implementation

The repository implementation is simple, straightforward, and easy to understand SQL and PHP code. It uses transactions to ensure data consistency:

```php
final class OrderRepository implements OrderRepositoryInterface
{
    public function __construct(
        private readonly \PDO $pdo,
    ) {}

    public function persist(Order $order): void
    {
        $memento = $order->createMemento();
        $this->pdo->beginTransaction();

        try {
            $this->persistOrder($memento);
            $this->persistOrderItems($memento);
            $this->persistOrderShippingAddress($memento);
            $this->storeMemento($memento);

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function restore(string $id, ?int $version = null): ?Order
    {
        $snapshot = $this->fetchMementoSnapshot($id, $version);

        if (null === $snapshot) {
            return null;
        }

        return Order::createFromMemento(OrderMemento::fromJson($snapshot));
    }

    private function persistOrder(OrderMemento $memento): void
    {
        $data = $memento->toArray();
        $stmt = $this->pdo->prepare(
            'INSERT OR REPLACE INTO orders (id, customer, status, updated_at) 
             VALUES (:id, :customer, :status, CURRENT_TIMESTAMP)'
        );

        $stmt->execute([
            ':id' => $data['id'],
            ':customer' => $data['customer'],
            ':status' => $data['status'],
        ]);
    }

    private function persistOrderItems(OrderMemento $memento): void
    {
        $data = $memento->toArray();
        foreach ($data['items'] as $itemData) {
            $stmt = $this->pdo->prepare(
                'INSERT OR REPLACE INTO order_items (order_id, product, quantity, price) 
                 VALUES (:order_id, :product, :quantity, :price)'
            );

            $stmt->execute([
                ':order_id' => $data['id'],
                ':product' => $itemData['product'],
                ':quantity' => $itemData['quantity'],
                ':price' => $itemData['price'],
            ]);
        }

        $this->removeOrphanedOrderItems($memento);
    }

    private function storeMemento(OrderMemento $memento): void
    {
        $data = $memento->toArray();
        $stmt = $this->pdo->prepare(
            'SELECT COALESCE(MAX(version), 0) + 1 AS next_version FROM order_mementos WHERE id = :id'
        );
        $stmt->execute([':id' => $data['id']]);
        $nextVersion = (int) $stmt->fetchColumn();

        $stmt = $this->pdo->prepare(
            'INSERT INTO order_mementos (id, version, snapshot) VALUES (:id, :version, :snapshot)'
        );

        $stmt->execute([
            ':id' => $data['id'],
            ':version' => $nextVersion,
            ':snapshot' => json_encode($memento, JSON_THROW_ON_ERROR),
        ]);
    }

    // ... additional helper methods for shipping address and orphaned items cleanup
}
```

### Handling Optimistic Concurrency

To prevent conflicts in concurrent updates (e.g., two users modifying the same order simultaneously), add a version field to the orders table and Memento. During `persist()`, check if the current version matches the loaded one before updating:

```php
// In OrderMemento, add:
private int $version;

// In persist():
$data = $memento->toArray();
$stmt = $this->pdo->prepare('SELECT version FROM orders WHERE id = :id FOR UPDATE');
$stmt->execute([':id' => $data['id']]);
$currentVersion = (int) $stmt->fetchColumn();

if ($currentVersion !== $memento->version()) {
    throw new ConcurrencyException('Order modified by another process.');
}

// Proceed with updates, then increment version
```

## Alternative Persistence Strategies

There are of course as usual multiple ways to persist aggregates.

* Simply implement a `toArray()` and `fromArray()` method on the aggregate.
* Use ORM attributes directly on the aggregate.
* Use Event Sourcing.
* Use Reflection to read and write the internal state of the aggregate.

However, each of them has very different trade offs. The memento pattern is no silver bullet, nor is any of the other solutions.

You can find an overview of the trade offs in a great [article](https://www.michael-ploed.com/blog/persistence-strategies-for-aggregates-at-ddd-europe-2025) written by [Michael Plöd](https://www.michael-ploed.com).

## Downsides of the Memento Pattern (in PHP)

PHP cannot enforce the "narrow vs. wide interface" constraint described in the [Gang of Four book](https://en.wikipedia.org/wiki/Design_Patterns).

* No friend classes - Unlike C++, PHP has no friend keyword that would allow Order to access private members of OrderMemento while denying access to everyone else.
* No package-private visibility - Unlike Java's default (package) visibility, PHP only has public, protected, and private. There's no way to say "accessible only to classes in this namespace."
* No nested/inner classes - In Java or C#, you could define OrderMemento as a private inner class of Order, giving Order full access while hiding it from others. PHP doesn't support this.

Any code can call `$memento->toArray()` and inspect/modify the state, violating the pattern's intent that only the Originator should access the internal data.

### Possible Mitigation

* Convention-based - Document that only Order should call certain methods. Relies on developer discipline.
* Closure-based encapsulation - The Originator could store state in a closure that only it can invoke. Awkward and rarely used.
* Opaque token pattern - The memento could be an opaque identifier (e.g., UUID), with the actual state stored in a private static map inside the Originator. This has memory management issues.
* Debug Backtrace - The memento could use `debug_backtrace()` to verify the caller is Order, but this is a runtime hack, not compile-time enforcement, and is easily bypassed.

The Gang of Four book itself acknowledges this in consequence #4: "It may be difficult in some languages to ensure that only the originator can access the memento's state." PHP is one of those languages. The implementation is a pragmatic, idiomatic PHP approach—you just can't get the strict encapsulation guarantee that C++ friend or Java inner classes would provide.

## Final Words

I hope this article motivates some of you to try to go back and embrace simplicity where it makes sense. You remember YAGNI and KISS? This article is exactly about that. Do you *really* need an ORM?
