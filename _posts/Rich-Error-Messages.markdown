---
layout: post
title: 'API Error Messages'
categories: software-architecture
tags:
  - software-architecture
  - api
  - api-design
date: 2025-02-14T20:43:22.000Z
draft: true
comments: true
---

Error Messages are simple, right? It's just a message, isn't it? Yes, but even an error message can and really should provide value for the person reading it in one way or another and then it suddenly isn't that simple anymore. Good error messages are in fact a more or less complex topic and we should treat them as 1st class citizens.

## Who is addressed by the error messages?

There are many different stakeholders with different needs regarding the amount and depth of the information an error message should communicate:

* End Users who use the software.
* Developers who need to debug the software.
* Developers who use/integrate with your software via its APIs.
* Client Systems that need to do something with them.

## Error Messages nobody likes

What do you think about an error message like this one?

> An error occurred.

Or how about that?

> 500 - Server Error

A completely useless error message, right? I guess that you have unfortunately encountered error messages like that many times before. As an user affect by this we usually are angry about the lack of information. This should already motivate us to build better error messages than the ones that annoy us in our daily life.

Error messages really should contain **all** required information to *understand what happened* and to *identify the cause* of the problem and the entities and actors involved in the given context.

## Better Error Messages

So what could a proper error message look like? Maybe something like this?

> An error occurred in the ProcessActivation component; The process can’t be activated without giving the `modify` permission to the logged in user.

Note that above it says “logged in” user, this can, in other circumstances, be very well another actor like an “Approver” or “Supervisor”. That's why it is important to mention the actual actor in the right context.

A good error message should contain these points if possible:

* Who?
* What?
* Where?
* Why?

A [Problem Details RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) Response example. The fields `type`, `status`, `title`, `detail`, and `"instance` are part of RFC 9457, the additional field are `extensions` and provide additional information.

```json
{
    "status": 401,
    "type": "https://docs.manufacturing.stuff/errors/activation-process/AP-E0012",
    "title": "Activation process failed.",
    "detail": "An error occurred in the ProcessActivation component; The process can’t be activated without giving the `activate` permission to the logged in user.",
    "instance": "/process/5190fca3-9975-4f74-9285-96bec302728c",
    "code": "AP-E0012",
    "permission": "activate",
    "user": "5190fca3-9975-4f74-9285-96bec302728c",
    "process": "5190fca3-9975-4f74-9285-96bec302728c",
    "affectedComponent": "ProcessActivation",
    "correlationId": "2173be5a-e421-4e3d-86ba-325c8007e22a", // Add the correlation ID if you use one
    "occurredAt": "2009-11-04T19:55:41Z" // Helps to find narrow down things in logs by time
    "debug": { // Only in development and test environments!
        "trace:" [
            {
                "class":"\App\Module\Processing\Domain\ProcessActivation",
                "line": 41 
            }
            // ...
        ]
    }
}
```

The error message contains all necessary information to identify the involved components, entities and actors. The class and line should be hidden outside of a testing or debugging context.

Maybe the user has indeed the correct permission but the system failed to resolve that.

Be careful what information you expose. Imagine a medical system that somehow leaks a diagnosis to an unauthorized person, or anything within the legal system that leaks information to a person or entity that should not know about it. While the message should be as expressive as possible, it must not expose critical information either.

### Error Code Suggestions

Error codes MUST be human readable and not hard to comprehend values like an UUID.

For example AP-E1 must be unique within the service and identifies the error E1 in the “Activation Process" (AP). It’s short enough to be remembered and written out, yet it carries at least *some* information.

The definition of the error codes is up to the service. The error codes MUST be unique per component and must not be re-used within, so the location of the error within the system can be determined.

### Proposed Conventions

* Error message **MUST** be expressive and clear:
  * The cause of the error **MUST** be clearly defined if known.
  * The element of the system causing the error message **MUST** be clear for the reader.
  * Relevant context, e.g. IDs, entity type(s) and actor(s) **MUST** be included.
  * Information that reveals business secrets or poses security risks and GDPR violations **MUST NOT** be part of the information returned by the API.
  * Error codes **MUST** be human readable and memorable.
  * If the error message is translatable is a decision made by the service providing the API.

### What if I need to hide information?

You can still use an ID, ideally a correlation ID, and display this as part of the error message. If a user reports his problem with this ID you'll be, depending on your APM and logging, be able to track down the exact process and th involved building blocks that caused this issue.

## Conclusion

By investing just some time to come up with proper error messages, you'll save the users of your program, API or library hours or even days of work and annoying research into why they've got that error. So you invest in developer experience and customer satisfactions, depending on what type of product and software you are working on.
