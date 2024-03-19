---
layout: post
title: REST is not CRUD
categories: software-architecture
tags: software-architecture
draft: true
published: false
comments: true
---

When it comes to RESTful APIs there are in my opinion a lot wrong assumptions.

1. REST is CRUD.
2. A resource is an entity (usually mapped to a DB entity).
3. RESTful API must not use verbs.

```text
POST /playlist/1/play
POST /playlist/1/pause
POST /playlist/1/stop
```

POST /playlist/1

When it comes to REST it makes sense to actually read [the dissertation](https://ics.uci.edu/~fielding/pubs/dissertation) of Roy Thomas Fielding.

https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

> The key abstraction of information in REST is a resource. Any information that can be named can be a resource: a document or image, a temporal service (e.g. "today's weather in Los Angeles"), a collection of other resources, a non-virtual object (e.g. a person), and so on. In other words, any concept that might be the target of an author's hypertext reference must fit within the definition of a resource. A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time.

> REST components perform actions on a resource by using a representation to capture the current or intended state of that resource and transferring that representation between components.

https://ics.uci.edu/~fielding/pubs/dissertation/evaluation.htm

> Semantics are a by-product of the act of assigning resource identifiers and populating those resources with representations. At no time whatsoever do the server or client software need to know or understand the meaning of a URI -- they merely act as a conduit through which the creator of a resource (a human naming authority) can associate representations with the semantics identified by the URI. In other words, there are no resources on the server; just mechanisms that supply answers across an abstract interface defined by resources. It may seem odd, but this is the essence of what makes the Web work across so many different implementations.

## Conclusion

Be pragmatic. Build whatever makes sense for *your* project. Who is the consumer of your API? How easy will it be for it to learn and use the API? Will it be intuitive to use?
