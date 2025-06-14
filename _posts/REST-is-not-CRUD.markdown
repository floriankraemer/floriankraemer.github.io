---
layout: post
title: Most RESTful APIs aren't RESTful
categories: software-architecture
tags: software-architecture
draft: true
published: false
comments: true
---

When talking about REST, it makes sense to actually read [the dissertation](https://ics.uci.edu/~fielding/pubs/dissertation) of Roy Thomas Fielding. The [original paper](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf) that describes RESTful web, "Architectural Styles and the Design of Network-based Software Architectures" by Roy T. Fielding (2000), introduces the Representational State Transfer (REST) architectural style as a framework for designing scalable, performant, and maintainable networked systems, particularly web services.

The paper aims to analyze architectural styles for network-based systems, identifying their strengths and weaknesses. It defines REST as a specific architectural style optimized for the modern web, focusing on scalability, simplicity, and adaptability.

Fielding demonstrates how REST principles shape the success of the web, advocating for its adoption in designing distributed systems with universal, stateless interfaces and clear resource-based interactions.

In his dissertation he does **not** prescribe the specific use of HTTP verbs (like GET, POST, PUT, DELETE) or focus on CRUD-style APIs as REST is often implemented today.

The dissertation clearly describes REST as an architectural style that provides principles and constraints for building network-based applications, using the web as its foundational example.

Roy Fielding has explicitly criticized the oversimplification of REST in CRUD-style APIs, emphasizing that many so-called "RESTful" APIs fail to implement key REST constraints, particularly the use of hypermedia for driving application state transitions. In his 2008 blog post, "REST APIs must be hypertext-driven," Fielding states:

> "If the engine of application state (and hence the API) is not being driven by hypertext, then it cannot be RESTful and cannot be a REST API. Period." [Source](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)

This underscores his view that without hypermedia controls, an API does not fulfill the REST architectural style Hypermedia controls are elements embedded in a resource representation that guide clients on what actions they can take next.

Common misconceptions in the context of what people consider REST are for example

* REST is CRUD (often it is, but not always)
* A resource is an entity (often mapped to a DB entity).
* RESTful API must not use verbs.
* ...

But those are actually *design decision* made for the API at hand, chosen by their creators and have nothing to do with REST.

## What Does "Driven by Hypertext" Mean?

The phrase "not being driven by hypertext" in Roy Fielding's criticism refers to the absence of Hypermedia as the Engine of Application State ([HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)) in many APIs that claim to be RESTful. HATEOAS is a fundamental principle of REST, requiring that the client dynamically discover actions and interactions through hypermedia links embedded in server responses, rather than relying on out-of-band knowledge (e.g., API documentation).

```json
{
  "orderId": 123,
  "_links": {
    "self": { "href": "/orders/123" },
    "cancel": { "href": "/orders/123/cancel", "method": "POST" }
  }
}
```

So you are probably more likely to do "RESTful" by implementing HATEOAS than by arguing about if you are allowed to use verbs or no verbs at all in your URI.

## What Fielding considers a RESTful API

In 2008, Fielding expressed frustration: [Source](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)

> I am getting frustrated by the number of people calling any HTTP-based interface a REST API.

Fielding describes six rules that you should consider before calling your API a RESTful API [Source](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).

> API designers, please note the following rules before calling your creation a REST API:

1. **A REST API should not be dependent on any single communication protocol**, though its successful mapping to a given protocol may be dependent on the availability of metadata, choice of methods, etc. In general, any protocol element that uses a URI for identification must allow any URI scheme to be used for the sake of that identification. *[Failure here implies that identification is not separated from interaction.]*

1. **A REST API should not contain any changes to the communication protocols aside from filling-out or fixing the details of underspecified bits of standard protocols**, such as HTTP’s PATCH method or Link header field. Workarounds for broken implementations (such as those browsers stupid enough to believe that HTML defines HTTP’s method set) should be defined separately, or at least in appendices, with an expectation that the workaround will eventually be obsolete. *[Failure here implies that the resource interfaces are object-specific, not generic.]*

2. **A REST API should spend almost all of its descriptive effort in defining the media type(s) used for representing resources and driving application state, or in defining extended relation names and/or hypertext-enabled mark-up for existing standard media types.** Any effort spent describing what methods to use on what URIs of interest should be entirely defined within the scope of the processing rules for a media type (and, in most cases, already defined by existing media types). *[Failure here implies that out-of-band information is driving interaction instead of hypertext.]*

3. **A REST API must not define fixed resource names or hierarchies (an obvious coupling of client and server).** Servers must have the freedom to control their own namespace. Instead, allow servers to instruct clients on how to construct appropriate URIs, such as is done in HTML forms and URI templates, by defining those instructions within media types and link relations. [Failure here implies that clients are assuming a resource structure due to out-of band information, such as a domain-specific standard, which is the data-oriented equivalent to RPC’s functional coupling].

4. **A REST API should never have “typed” resources that are significant to the client.** Specification authors may use resource types for describing server implementation behind the interface, but those types must be irrelevant and invisible to the client. The only types that are significant to a client are the current representation’s media type and standardized relation names. [ditto]

5. **A REST API should be entered with no prior knowledge beyond the initial URI** (bookmark) and set of standardized media types that are appropriate for the intended audience (i.e., expected to be understood by any client that might use the API). From that point on, all application state transitions must be driven by client selection of server-provided choices that are present in the received representations or implied by the user’s manipulation of those representations. The transitions may be determined (or limited by) the client’s knowledge of media types and resource communication mechanisms, both of which may be improved on-the-fly (e.g., code-on-demand). *[Failure here implies that out-of-band information is driving interaction instead of hypertext.]*

But what does all of that exactly mean? To be honest, without spending some time and thoughts I didn't comprehend it either the first time I was reading it.

## Interpretation of the Rules

This is my understanding of them, feel free to disagree and lets have a conversation! I'm curious to learn a different point of view or opinion about them.

### 1. Don't Depend on One Protocol

A REST API shouldn't be locked to one communication protocol (like HTTP). It should work as long as the protocol uses **URIs** to identify resources, not just **URLs**.

A URI (Uniform Resource Identifier) is a broad concept that refers to any string used to identify a resource, while a URL (Uniform Resource Locator) is a specific type of URI that not only identifies a resource but also provides a means to locate it by describing its primary access mechanism (such as its network location).

Imagine you design your API to only work over HTTP. If later someone wants to use it over HTTPS or a future protocol, it breaks.

Your API should work with any URI and not rely on HTTP-specific mechanisms.

### 2. Don't Change the Protocol

Stick to existing standards (like HTTP). If something in the standard is vague, clarify it. Don’t invent new behaviors or break existing ones.

Don’t hack or redefine how HTTP works. Fix the gaps, but don’t change the rules.

If HTTP doesn’t fully define how PATCH should work, you can clarify it. But don’t redefine GET to also delete data just because it's convenient.

### 3. Focus on Media Types, Not URIs

Your API should define how to understand and use the data it returns — through media types (like JSON, HTML) and links — not focus on the structure of URIs or what actions to call.

Put your energy into designing the format of the data and the links inside it, not into documenting what URLs to hit.

Instead of just documenting `POST /users/123/activate` in for example a OpenAPI specification, you return a link in the  JSON:

```json
{ "activate": { "href": "/users/123/activate", "method": "POST" } }
```

### 4. Don't Hardcode URI Structures

Clients shouldn't assume or hardcode paths like `/users/123/posts`. Instead, they should discover URIs through links provided by the server. Clients should learn about URIs dynamically, not hardcode them.

A client shouldn’t assume that a user’s posts are at /users/123/posts. It should read a link like this from the resource:

```json
{ "posts": { "href": "/users/123/posts" } }
```

### 5. Avoid Resource “Types”

The client shouldn’t care what kind of object a resource represents internally (like User, Admin, Moderator). It should care only about the media type (like application/json) and the links/actions (HATEOAS) it sees.

Don't expose internal object types or roles. Just send a well-structured response with useful links. Don’t require the client to know that a resource is of type AdminUser. Just give them a consistent application/json response with relevant links and data.

By "standardized relation names" he refers to the [registered link relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml) by the [IANA](https://www.iana.org).

### 6. Start with a Bookmark and Follow the Links

The client should only need one starting point (e.g., a base URL) and a knowledge of standard media types. Everything else — what to do, where to go — should come from the server responses.

Clients should follow links like browsing a website — starting from the home page and clicking through, not hardcoding paths.

Start with https://api.example.com/ and follow the _links in each response:

```json
{
  "_links": {
    "user": { "href": "/users/123" },
    "orders": { "href": "/users/123/orders" }
  }
}
```

### Closing thoughts about the Rules

Fielding’s rules emphasize that a truly RESTful API should embrace hypermedia (HATEOAS) as the central mechanism for interaction, not just use HTTP as a transport. REST is protocol-independent at its core; HTTP is simply a convenient way of using it. Clients should discover and navigate resources dynamically through links and standardized relations embedded in representations — not rely on hardcoded URI structures, types, or external documentation.

This makes REST systems loosely coupled, evolvable, and aligned with how the web itself operates: through representation, discovery, and transitions. REST isn’t about exposing your internal object model over HTTP — it’s about building distributed systems that behave like the web.

---

When it comes to RESTful APIs there are in my opinion a lot of common but wrong assumptions.

* REST is CRUD (often it is, but not always)
* A resource is an entity (often mapped to a DB entity).
* RESTful API must not use verbs.

```text
POST /playlist/1/play
POST /playlist/1/pause
POST /playlist/1/stop
```

When it comes to REST it makes sense to actually read [the dissertation](https://ics.uci.edu/~fielding/pubs/dissertation) of Roy Thomas Fielding.

https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

> **The key abstraction of information in REST is a resource.** Any information that can be named can be a resource: a document or image, a temporal service (e.g. "today's weather in Los Angeles"), a collection of other resources, a non-virtual object (e.g. a person), and so on. In other words, any concept that might be the target of an author's hypertext reference must fit within the definition of a resource. A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time.
>
> REST components perform actions on a resource by using a representation to capture the current or intended state of that resource and transferring that representation between components.

https://ics.uci.edu/~fielding/pubs/dissertation/evaluation.htm

> Semantics are a by-product of the act of assigning resource identifiers and populating those resources with representations. At no time whatsoever do the server or client software need to know or understand the meaning of a URI -- they merely act as a conduit through which the creator of a resource (a human naming authority) can associate representations with the semantics identified by the URI. In other words, there are no resources on the server; just mechanisms that supply answers across an abstract interface defined by resources. It may seem odd, but this is the essence of what makes the Web work across so many different implementations.

What is a resource? Let's take a look at [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)

```text
This specification does not limit the scope of what might be a
resource; rather, the term "resource" is used in a general sense
for whatever might be identified by a URI.  Familiar examples
include an electronic document, an image, a source of information
with a consistent purpose (e.g., "today's weather report for Los
Angeles"), a service (e.g., an HTTP-to-SMS gateway), and a
collection of other resources.  A resource is not necessarily
accessible via the Internet; e.g., human beings, corporations, and
bound books in a library can also be resources.  Likewise,
abstract concepts can be resources, such as the operators and
operands of a mathematical equation, the types of a relationship
(e.g., "parent" or "employee"), or numeric values (e.g., zero,
one, and infinity).
```

The following examples of URIs are taken from the RFC as well:

* ftp://ftp.is.co.za/rfc/rfc1808.txt
* http://www.ietf.org/rfc/rfc2396.txt
* ldap://[2001:db8::7]/c=GB?objectClass?one
* mailto:John.Doe@example.com
* news:comp.infosystems.www.servers.unix
* tel:+1-816-555-1212
* telnet://192.0.2.16:80/
* urn:oasis:names:specification:docbook:dtd:xml:4.1.2

As you can clearly see, an URI is not an URL.

## Conclusion

**Be pragmatic.** I personally like to avoid the term "RESTful" for the reasons given in the article and instead say "HTTP" based APIs.

Build whatever makes sense for **your** project and the consumers of your API. Ignore the dogmatists who preach what RESTful APIs might be and what not. An API should be easy to learn and hard to misuse in the first place. If it fulfills that criteria it doesn't matter if it is RESTful or no.

Who is the consumer of your API? How easy will it be for it to learn and use the API? Will it be intuitive to use? What are possible constraints? How do you version it? Deprecation and sun-setting strategies? How are changes to the API effectively communicated to consumers? Those things are much more valuable than the actual format of your resource identifier.
