---
layout: post
title: 'Persisting Aggregates with the Memento Pattern and embracing Simplicity'
categories: software-architecture
tags: 
    - aggregate-pattern
    - patterns
    - coupling
    - software-architecture
draft: true
published: false
comments: true
date: 2025-12-12
---

This article will show how to use the Memento Pattern to persist aggregates just using plain old PDO.

Why just PDO? Because of *simplicity*. Are you doing anything complex here? It is just simple inserts and updates, no? Yes, there can be complex cases, but unless you do something very specific it is unlikely.

I've used [cloc](https://github.com/AlDanial/cloc) to measure the pure number of lines of code, no comments and empty lines were counted.

* The Doctrine DBAL package has 25959 lines of code.
* The Doctrine ORM package has 32786 lines of code and depends on doctrine/dbal.

And there are of course more dependencies. With just these two packages you are already using ~58.000 lines of code that are now **your liability**.

The biggest downside here would be that you use some SQL dialect specific functions, but how often do you do that for inserts and updates and even if you have to use them, how often do you actually change your DB system? And even if you do: How much effort will it be to change this? Given that your repositories should implement in any case an interface, you can easily change or add additional repository implementations if you have a need to do so later on.

I think one of our biggest problems these days is that we throw a giant library on everything just because we can and because the resources are there. Most projects these days are not that limited in memory and computing power. You could now argue that those libs make it easier to use DB systems.

While I had only one project in the past ~22 years that migrated from one DB dialect to another, I've seen more issues with switching between persistence libraries and by that I mean even going from one major version to another major version of the same library. It won't happen often but at least in my personal experience (I'm not saying this is absolute!) a long-lived project is more likely to run into migration issues with the library than into the need to switch DB systems.

If you know why you use DDD aggregates and use them correctly, there might be but there shouldn't necessarily be a match with your DB structure. I would *never* design a system with database structures first in mind these days unless it is very, very data centric. Also, to store and read your aggregates, you will very likely not need very complex and DB specific functions. You could even store them in a specific table and use triggers to modify other tables based on an insert or update to it.

Let's compare the code and see if we can save anything regarding complexity, technical or cognitive.

### Why not just an array?

* An array is not typed.
* An array might have missing keys.
* You'll need PHPStans array shape in the doc-block to make it more accessible and checkable.

Using a simple plain old PHP object like the Memento gives you strong types out of the box and defines the shape automatically by using an object. Instead of writing PHPStans array shape annotation, you can also simply write a proper object. I see no reason how the array would be more beneficial in this case.

Some people might argue about the memory and disk space the class might take. I don't think this is a concern here unless you do something with extreme performance concerns or in a very limited environment like working on an embedded system with very limited memory and processing power.

### Why not using a persistence entity directly?

You would directly couple your domain model to the persistence layer. Using the memento, that is part of your domain model layer, will basically inverse that dependency. Your infrastructure / persistence layer will now have to know about the domain, which is perfectly fine.

#### PDO Repository

```php
// persist order
$stmt = $this->pdo->prepare(
    'REPLACE INTO orders (id, customer, status) VALUES (:id, :customer, :status)'
);
$stmt->execute([
    ':id' => $order->createMemento()->id(),
    ':customer' => $order->createMemento()->customer(),
    ':status' => $order->createMemento()->status(),
]);
```

#### Doctrine DBAL Repository

```php
// persist order
$this->connection->executeStatement(
    'REPLACE INTO orders (id, customer, status) VALUES (:id, :customer, :status)',
    [
        'id' => $order->createMemento()->id(),
        'customer' => $order->createMemento()->customer(),
        'status' => $order->createMemento()->status(),
    ]
);

```

#### Doctrine ORM Repository

```php
// persist order
$entity = new OrderEntity(
    $order->createMemento()->id(),
    $order->createMemento()->customer(),
    $order->createMemento()->status()
);

$this->entityManager->persist($entity);
$this->entityManager->flush(); // writes to DB
```

### Comparison

| Approach          | Style                         | Pros                                                                 | Cons                                                                          |
| ----------------- | ----------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **PDO**           | Raw SQL                       | Simple, no dependencies                                              | Lots of boilerplate, no schema abstraction                                    |
| **Doctrine DBAL** | SQL with convenience          | Cleaner, portable, parameter typing                                  | Still SQL-heavy                                                               |
| **Doctrine ORM**  | Entity mapping & Unit of Work | Very expressive, tracks changes, integrates well with DDD aggregates | More setup (entities, mappings, proxies), may be heavy for simple persistence |

---

Build a DDD-style aggregate root that persists across multiple tables (so you see how the Repository handles transactions with PDO) plus a Memento that snapshots and restores its state.

Example Domain: Order Aggregate

* orders → Order root (id, customer, status)  
* order_items → Line items (product, quantity, price)  
* order_metadata → Extra details (like shipping address)

We’ll then make a Memento snapshot of the full aggregate.

SQL Tables

```sql
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE order_metadata (
    order_id VARCHAR(36) PRIMARY KEY,
    shipping_address VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE order_mementos (
    id VARCHAR(36) NOT NULL,
    version INT NOT NULL AUTO_INCREMENT,
    snapshot JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, version)
);
```

Aggregate Root and Entities

```php
final class Order
{
    private string $id;
    private string $customer;
    private string $status;
    /** @var OrderItem[] */
    private array $items = [];
    private ?OrderMetadata $metadata = null;

    public function __construct(string $id, string $customer)
    {
        $this->id = $id;
        $this->customer = $customer;
        $this->status = 'new';
    }

    public function addItem(string $product, int $quantity, int $price): void
    {
        $this->items[] = new OrderItem($product, $quantity, $price);
    }

    public function setMetadata(string $shippingAddress): void
    {
        $this->metadata = new OrderMetadata($shippingAddress);
    }

    // --- Memento ---
    public function createMemento(): OrderMemento
    {
        return new OrderMemento(
            $this->id,
            $this->customer,
            $this->status,
            $this->items,
            $this->metadata
        );
    }

    public static function createFromMemento(OrderMemento $memento): void
    {
        $that = new $this(
            $memento->id(),
            $memento->customer()
        );
        $that->status = $memento->status();
        $that->items = $memento->items();
        $that->metadata = $memento->metadata();

        return $that;
    }
}
```

```php
final class OrderItem
{
    private string $product;
    private int $quantity;
    private int $price;

    public function __construct(string $product, int $quantity, int $price)
    {
        $this->product = $product;
        $this->quantity = $quantity;
        $this->price = $price;
    }

    public function toArray(): array
    {
        return [
            'product' => $this->product,
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}

final class OrderMetadata
{
    private string $shippingAddress;

    public function __construct(string $shippingAddress)
    {
        $this->shippingAddress = $shippingAddress;
    }

    public function toArray(): array
    {
        return ['shipping_address' => $this->shippingAddress];
    }
}
```

Memento

```php
final class OrderMemento
{
    private string $id;
    private string $customer;
    private string $status;
    /** @var OrderItem[] */
    private array $items;
    private ?OrderMetadata $metadata;

    public function __construct(
        string $id,
        string $customer,
        string $status,
        array $items,
        ?OrderMetadata $metadata
    ) {
        $this->id = $id;
        $this->customer = $customer;
        $this->status = $status;
        $this->items = $items;
        $this->metadata = $metadata;
    }

    public function id(): string { return $this->id; }
    public function customer(): string { return $this->customer; }
    public function status(): string { return $this->status; }
    /** @return OrderItem[] */
    public function items(): array { return $this->items; }
    public function metadata(): ?OrderMetadata { return $this->metadata; }

    public function toJson(): string
    {
        return json_encode([
            'id' => $this->id,
            'customer' => $this->customer,
            'status' => $this->status,
            'items' => array_map(fn($i) => $i->toArray(), $this->items),
            'metadata' => $this->metadata?->toArray(),
        ]);
    }

    public static function fromJson(string $json): self
    {
        $data = json_decode($json, true);
        $items = array_map(
            fn($i) => new OrderItem($i['product'], $i['quantity'], $i['price']),
            $data['items']
        );
        $metadata = $data['metadata']
            ? new OrderMetadata($data['metadata']['shipping_address'])
            : null;

        return new self($data['id'], $data['customer'], $data['status'], $items, $metadata);
    }
}
```

Repository with PDO (Multiple Tables Memento persistence)

```php
final class OrderRepository
{
    private \PDO $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function save(Order $order): void
    {
        $this->pdo->beginTransaction();

        try {
            // persist order
            $stmt = $this->pdo->prepare(
                'REPLACE INTO orders (id, customer, status) VALUES (:id, :customer, :status)'
            );
            $stmt->execute([
                ':id' => $order->createMemento()->id(),
                ':customer' => $order->createMemento()->customer(),
                ':status' => $order->createMemento()->status(),
            ]);

            // clear items and re-insert
            $this->pdo->prepare('DELETE FROM order_items WHERE order_id = :id')
                      ->execute([':id' => $order->createMemento()->id()]);
            foreach ($order->createMemento()->items() as $item) {
                $stmt = $this->pdo->prepare(
                    'INSERT INTO order_items (order_id, product, quantity, price) 
                     VALUES (:order_id, :product, :quantity, :price)'
                );
                $stmt->execute([
                    ':order_id' => $order->createMemento()->id(),
                    ':product' => $item->toArray()['product'],
                    ':quantity' => $item->toArray()['quantity'],
                    ':price' => $item->toArray()['price'],
                ]);
            }

            // metadata
            $this->pdo->prepare('DELETE FROM order_metadata WHERE order_id = :id')
                      ->execute([':id' => $order->createMemento()->id()]);
            if ($order->createMemento()->metadata() !== null) {
                $stmt = $this->pdo->prepare(
                    'INSERT INTO order_metadata (order_id, shipping_address) 
                     VALUES (:order_id, :shipping_address)'
                );
                $stmt->execute([
                    ':order_id' => $order->createMemento()->id(),
                    ':shipping_address' => $order->createMemento()->metadata()->toArray()['shipping_address'],
                ]);
            }

            // memento snapshot
            $memento = $order->createMemento();
            $stmt = $this->pdo->prepare(
                'INSERT INTO order_mementos (id, snapshot) VALUES (:id, :snapshot)'
            );
            $stmt->execute([
                ':id' => $memento->id(),
                ':snapshot' => $memento->toJson(),
            ]);

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function restore(string $id, int $version): ?Order
    {
        $stmt = $this->pdo->prepare(
            'SELECT snapshot FROM order_mementos WHERE id = :id AND version = :version'
        );
        $stmt->execute([':id' => $id, ':version' => $version]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        $memento = OrderMemento::fromJson($row['snapshot']);
        $order = new Order($memento->id(), $memento->customer());
        $order->restoreMemento($memento);

        return $order;
    }
}
```

Usage Example

```php
$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
$repo = new OrderRepository($pdo);

// Create aggregate
$order = new Order('order-1', 'Florian');
$order->addItem('Book', 2, 1500);
$order->addItem('Pen', 5, 200);
$order->setMetadata('123 Main Street, Berlin');

// Persist aggregate and snapshot
$repo->save($order);

// Restore snapshot from version 1
$restored = $repo->restore('order-1', 1);
```

---

I hope this article motivates some of you to try to go back and embrace simplicity where it makes sense. You remember YAGNI and KISS? This article is exactly about that. Do you *really* need an ORM for the simple cases?
