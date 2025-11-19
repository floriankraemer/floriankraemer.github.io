---
layout: post
title: 'Useful HTTP headers you might now know'
categories: software-architecture
tags:
  - software-architecture
  - solid-principles
  - principles
date: 2025-02-24T16:43:22.000Z
draft: true
comments: true
---

I was about to add this to my article about better error messages, but then realized that it might be a little off topic and decided to have a dedicated article about them.

### Useful HTTP Headers

There are quiet a few HTTP headers that are useful when dealing with certain scenarios.

#### Rate Limiting Headers

They communicate rate-limiting information when an API returns a 429 Too Many Requests error. They help clients understand their rate limit quota, how many requests remain, and when the limit resets.

* X-RateLimit-Limit: Total number of requests allowed in the current time window.
* X-RateLimit-Remaining: Number of requests remaining in the current window.
* X-RateLimit-Reset: Unix timestamp or seconds until the rate limit resets.

The fields above can be grouped in one header as well:

* RateLimit-Policy: "burst";q=100;w=60,"daily";q=1000;w=86400

These are not yet part of the HTTP standard but are widely adopted (e.g., by GitHub, Twitter APIs). The [IETF draft](https://www.ietf.org/archive/id/draft-ietf-httpapi-ratelimit-headers-09.txt) for rate-limiting headers (RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset) is gaining traction.

```text
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1625097600
Retry-After: 3600
```

#### Deprecation

Signals that an API endpoint or feature is deprecated and may be removed in the future. It warns clients of deprecated endpoints when returning errors like 410 Gone or 400 Bad Request for outdated requests. Is is often paired with a Sunset header to indicate when the endpoint will be removed.

```text
HTTP/1.1 410 Gone
Deprecation: true
Link: <https://docs.example.com/migration-guide>; rel="alternate"
```

#### Sunset

Indicates when a deprecated API or resource will be removed. It provides a timeline for clients to migrate away from deprecated endpoints, often used with Deprecation.

```text
HTTP/1.1 400 Bad Request
Deprecation: true
Sunset: Wed, 31 Dec 2025 23:59:59 GMT
```
