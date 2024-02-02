---
layout: post
categories: software-architecture
tags: software-architecture ddd
---

# Tactical DDD in Spryker

## Introduction

This is a hypothesis on how the Spryker architecture could be improved by using tactical patterns of DDD.

## Status Quo

* Sprykers modules very fine grained.
* Sprykers current implementation doesn't draw a clear consistency boundary between the domain models.

## Problem Statement

* Transfer objects can be changed everywhere and at any time, no consistency, no state.

## How to mitigate the problems

* Increase the size of a module by combining modules.
  * A module should reflect a whole process, not just parts of it.
* Give the module a clear consistency boundary.
  * The module must own the objects it works with (e.g. a customer entity can exists in N modules but is NOT shared).

It is very likely to determine what belongs together by analyzing the Git history and detect what modules were changed often together. There is a high probabitly that what changes often together actually should belong together.

```php
class Wishlist extends AbstractAggregate-
{
    public function __construct(
        protected WishlistAggregateTransfer $wishlistAggregateTransfer
    ) {

    }

    public function addProduct(
        Product $product
    ): void {
        //
    }

    public function addWatcher(
        Watcher $watcher
    ) {
        //
    }: void;

    public function publish(): void;

    public function unpublish(): void;
}
```

## What else could be done?

To get clear domain boundaries, each domain could, in theory, separate their DB by prefixing it with a domain, e.g.  `spy_wishlist_<entity_name>`.
