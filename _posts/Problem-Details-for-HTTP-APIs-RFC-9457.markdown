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

If you designed APIs before, you probably have had the problem as well, to define how an error response should look like. Usually some HTTP Status codes are defined for certain outcomes and when it comes to the response body you have to get creative.

There is now a more or less new RFC targeting API responses: [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html). It was published in July 2023 and I just found it recently and wrote [a PHP implementation](https://github.com/Phauthentic/error-response) of a proper response object for it.

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

Example of multiple errors of the same type:

```text
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json
Content-Language: en

{
 "type": "https://example.net/validation-error",
 "title": "Your request is not valid.",
 "errors": [
             {
               "detail": "must be a positive integer",
               "pointer": "#/age"
             },
             {
               "detail": "must be 'green', 'red' or 'blue'",
               "pointer": "#/profile/color"
             }
          ]
}
```

I'll keep this article shorter than the actual RFC.

* **type**: A URL to a documentation page of the error (I love the idea!)
* **title**: A title that expresses the general problem.
* **detail**: A more detailed description about the cause.
* **instance**: The resource that has a problem.
* **status**: The HTTP status code.

While the first four of the members of the detail object might be clear by just looking at them, the `status` member might require a little more explanation.

> The "status" member, if present, is only advisory; it conveys the HTTP status code used for the convenience of the consumer. Generators MUST use the same status code in the actual HTTP response, to assure that generic HTTP software that does not understand this format still behaves correctly. See Section 5 for further caveats regarding its use.

The rationale behind it is, that if the request goes through some proxies or load balancers, the HTTP status code *might* change. Therefore it makes a lot sense to retain the orginal code in the message. Somebody had a really good idea here.

So, why would you use the RFC?

* Its kind of a standard
