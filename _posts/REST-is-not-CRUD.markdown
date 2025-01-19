---
layout: post
title: Most of you are not doing REST
categories: software-architecture
tags: software-architecture
draft: true
published: false
comments: true
---

The [original paper](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf) that describes RESTful web, "Architectural Styles and the Design of Network-based Software Architectures" by Roy T. Fielding (2000), introduces the Representational State Transfer (REST) architectural style as a framework for designing scalable, performant, and maintainable networked systems, particularly web services.

The paper aims to analyze architectural styles for network-based systems, identifying their strengths and weaknesses. It defines REST as a specific architectural style optimized for the modern web, focusing on scalability, simplicity, and adaptability.

Fielding demonstrates how REST principles shape the success of the web, advocating for its adoption in designing distributed systems with universal, stateless interfaces and clear resource-based interactions.

In his dissertation he does not prescribe the specific use of HTTP verbs (like GET, POST, PUT, DELETE) or focus on CRUD-style APIs as REST is often implemented today. Instead, the dissertation describes REST as an architectural style that provides principles and constraints for building network-based applications, using the web as its foundational example.

Roy Fielding has explicitly criticized the oversimplification of REST in CRUD-style APIs, emphasizing that many so-called "RESTful" APIs fail to implement key REST constraints, particularly the use of hypermedia for driving application state transitions. In his 2008 blog post, "REST APIs must be hypertext-driven," Fielding states:

> "If the engine of application state (and hence the API) is not being driven by hypertext, then it cannot be RESTful and cannot be a REST API. Period." [Source](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)

This underscores his view that without hypermedia controls, an API does not fulfill the REST architectural style.

## What Does "Driven by Hypertext" Mean?

The phrase "not being driven by hypertext" in Roy Fielding's criticism refers to the absence of Hypermedia as the Engine of Application State ([HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)) in many APIs that claim to be RESTful. HATEOAS is a fundamental principle of REST, requiring that the client dynamically discover actions and interactions through hypermedia links embedded in server responses, rather than relying on out-of-band knowledge (e.g., API documentation).

## Six Criteria for what Fielding considers a RESTful API

Fielding describes six rules that you should consider before calling your API a RESTful API [Source](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).

* A REST API should not be dependent on any single communication protocol, though its successful mapping to a given protocol may be dependent on the availability of metadata, choice of methods, etc. In general, any protocol element that uses a URI for identification must allow any URI scheme to be used for the sake of that identification. [Failure here implies that identification is not separated from interaction.]

* A REST API should not contain any changes to the communication protocols aside from filling-out or fixing the details of underspecified bits of standard protocols, such as HTTP’s PATCH method or Link header field. Workarounds for broken implementations (such as those browsers stupid enough to believe that HTML defines HTTP’s method set) should be defined separately, or at least in appendices, with an expectation that the workaround will eventually be obsolete. [Failure here implies that the resource interfaces are object-specific, not generic.]

* A REST API should spend almost all of its descriptive effort in defining the media type(s) used for representing resources and driving application state, or in defining extended relation names and/or hypertext-enabled mark-up for existing standard media types. Any effort spent describing what methods to use on what URIs of interest should be entirely defined within the scope of the processing rules for a media type (and, in most cases, already defined by existing media types). [Failure here implies that out-of-band information is driving interaction instead of hypertext.]

* A REST API must not define fixed resource names or hierarchies (an obvious coupling of client and server). Servers must have the freedom to control their own namespace. Instead, allow servers to instruct clients on how to construct appropriate URIs, such as is done in HTML forms and URI templates, by defining those instructions within media types and link relations. [Failure here implies that clients are assuming a resource structure due to out-of band information, such as a domain-specific standard, which is the data-oriented equivalent to RPC’s functional coupling].

`A REST API should never have “typed” resources that are significant to the client. Specification authors may use resource types for describing server implementation behind the interface, but those types must be irrelevant and invisible to the client. The only types that are significant to a client are the current representation’s media type and standardized relation names. [ditto]

* A REST API should be entered with no prior knowledge beyond the initial URI (bookmark) and set of standardized media types that are appropriate for the intended audience (i.e., expected to be understood by any client that might use the API). From that point on, all application state transitions must be driven by client selection of server-provided choices that are present in the received representations or implied by the user’s manipulation of those representations. The transitions may be determined (or limited by) the client’s knowledge of media types and resource communication mechanisms, both of which may be improved on-the-fly (e.g., code-on-demand). [Failure here implies that out-of-band information is driving interaction instead of hypertext.]
















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
