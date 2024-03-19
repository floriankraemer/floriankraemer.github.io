---
layout: post
title: Problem Details for HTTP APIs
categories: software-architecture
tags:
  - API
  - HTTP
  - REST
  - software-architecture
  - RFC
date: 2024-03-15T21:45:00.000Z
---

There is a more or less new RFC targeting API responses: [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).

```text
POST /purchase HTTP/1.1
Host: store.example.com
Content-Type: application/json
Accept: application/json, application/problem+json

{
  "item": 123456,
  "quantity": 2
}
```

```text
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.com/probs/out-of-credit",
 "title": "You do not have enough credit.",
 "detail": "Your current balance is 30, but that costs 50.",
 "instance": "/account/12345/msgs/abc",
 "balance": 30,
 "accounts": ["/account/12345",
              "/account/67890"]
}
```
