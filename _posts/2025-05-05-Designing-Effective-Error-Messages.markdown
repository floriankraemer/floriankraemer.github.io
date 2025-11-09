---
layout: post
title: 'Designing Effective Error Messages'
categories: software-architecture
tags:
  - software-architecture
  - api
  - api-design
  - error-messages
  - user-experience
date: 2025-05-06T19:01:22.000Z
draft: false
comments: true
---

Error Messages are simple, right? It's just a message, isn't it? Yes, but even an error message can and really should provide *value* for the person reading it in one way or another and then it suddenly isn't that simple anymore. Good error messages are in fact a more or less complex topic and we should treat them as 1st class citizens.

## Error Messages nobody likes

What do you think about an error message like this one? A little scary?

![Windows 9x Blue Screen](/assets/images/illustrations/Windows_9X_BSOD.png)

What would your non-tech savvy friends say about this one?

![Windows 9x Blue Screen](/assets/images/illustrations/Forced-linux-kernel-panic-under-qemu.gif)

How do you, as a developer, like this one?

> An error occurred.

Or how about that?

> 500 - Server Error

A completely useless error message, right? I guess that you have unfortunately encountered error messages like that many times before in your life. As a user affected by this we usually are, to put it mildly, disappointed about the lack of information. This should already motivate us to build better error messages than the ones that annoy us in our daily life.

Error messages really should contain the required information to *understand what happened* and to *identify the cause* of the problem and the entities and actors involved in the given context.

## Who is addressed by the error messages?

But who is actually addressed by the error message? There are many different stakeholders with *different* needs regarding the amount and depth of the information an error message should communicate:

* End Users who use the software.
* Developers who need to debug the software.
* Developers who use/integrate with your software via its APIs.
* Client Systems that need to do something with them.

Here is an exemplary table that lists needs of different stakeholders. You must consider the needs of *your* stakeholders, so take this table as an *example*. You should figure out who *your* stakeholders are and what *their* needs and quality attributes are.

| **Stakeholder**                | **Needs / Quality Attributes**                                                                 |
|-------------------------------|-----------------------------------------------------------------------------------------------|
| **End Users**                 | - Clear and friendly message  <br> - Guidance on what to do next (actionability)  <br> - No sensitive info exposure |
| **Internal Developers**       | - Debuggability (e.g., stack traces, affected component)  <br> - Contextual information (who, what, where, why)  <br> - Correlation ID for log tracing |
| **External Developers (API)** | - Precise error codes  <br> - Human-readable error descriptions  <br> - Documentation linkage (via `type` URI)  <br> - Consistent structure (e.g. RFC 9457) |
| **Client Systems**            | - Machine-readable fields (e.g., `status`, `code`, `type`)  <br> - Deterministic and predictable structure for error parsing |
| **Security/Compliance Officers** | - No leakage of sensitive data  <br> - Regulatory compliance (e.g., GDPR, HIPAA)  <br> - Role-based visibility of data in errors |
| **Product Owners / UX**       | - Improved user satisfaction  <br> - Brand perception via thoughtful messaging |
| **Support/Helpdesk Teams**    | - Correlation IDs for issue tracking  <br> - Sufficient detail to triage without needing logs |

## Better Error Messages

So what could a proper error message look like? Maybe something like this example?

> An error occurred in the `ProcessActivation` component; The process with ID `8876693b-ec67-458a-a07a-57ed595328db` can’t be activated without giving the `modify` permission to the currently logged in user Jon Doe. Please contact your manager to grant you access.

Note that above it says “logged in” user, this can, in other circumstances, be very well another actor like an “Approver” or “Supervisor”. That's why it is important to mention the actual actor in the right context.

A good error message should contain these points if possible:

* **Who?** (The current logged in user)
* **What?** (can't be activated)
* **Where?** (The `ProcessActivation` Component)
* **Why?** (The permission is missing)

On top of that a way to resolve the issues is highly recommended. This doesn't have to be always a technical thing but can be very well to contact somebody to resolve the problem for you. In the example above it could be also a concrete person, like the name of the person owning the process that you tried to activate.

Depending on the context you could do a lot more for a good user experience: How about allowing you to contact your manager directly by making "the manager" clickable? I guess you see what we are up to with  this, right?

### Internationalization

Depending on your stakeholders you might want to have internationalization for your error messages and units. If you do so, you should consider idomatic phrases that don't translate well when you design your error messages.

Depending on who and where is going to see your error message, it might be a very good idea to convert units to whatever unit is expected by the reader of the error message. It is very unlikely that imperial units will be well understood in the european region while in the US the metric system is still not adopted in many places.

## API Error Messages

But not only end user facing error messages should be clear, especially API error messages should be very clear and contain useful information for the users of the API.

Here is a a [Problem Details RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) Response example. The fields `type`, `status`, `title`, `detail`, and `"instance` are part of RFC 9457, the additional field are `extensions` and provide additional information beyond the fields specified by RF 9457.

```json
{
    "status": 401,
    "type": "https://docs.manufacturing.stuff/api-errors/AP-E0012",
    "title": "Activation process failed.",
    "detail": "An error occurred in the ProcessActivation component; The process can’t be activated without giving the `activate` permission to the logged in user.",
    "instance": "/process/5190fca3-9975-4f74-9285-96bec302728c",
    "code": "AP-E0012",
    "permission": "activate",
    "user": "5190fca3-9975-4f74-9285-96bec302728c",
    "process": "5190fca3-9975-4f74-9285-96bec302728c",
    "affectedComponent": "ProcessActivation",
    "correlationId": "2173be5a-e421-4e3d-86ba-325c8007e22a", // Add the correlation ID if you use one
    "occurredAt": "2025-05-04T19:55:41Z" // Helps to find narrow down things in logs by time
    "debug": { // Only in development and test environments!
        "trace": [
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

## Error Code Suggestions

If error codes are used in an user facing context, they should be human readable and not hard to comprehend and remember values like an UUID.

For example AP-E1 must be unique within the service and identifies the error E1 in the “Activation Process" (AP). It’s short enough to be remembered and written out, yet it carries at least *some* information.

When you are dealing with machine to machine communication you could use whatever you want and provide documentation to map the codes to something more meaningful. But do not forget that there will be still humans, developers, who will very likely have to work with this.

The error codes should be unique per component and must not be re-used within, so the location of the error within the system can be determined easily and accurately.

## What if I need to hide information?

There are good reasons and sometimes if regulatory or compliance requirements that you must hide certain information. Imagine the case in which you are working with a medical record system and an error message exposes a severe diagnosis like cancer to people who should not have access to that information.

To work around that, you can still use an ID, ideally a [correlation ID](https://www.enterpriseintegrationpatterns.com/patterns/messaging/CorrelationIdentifier.html), and display this ID as part of the error message. If a user reports his problem with this ID you'll be, depending on your APM and logging, be able to track down the exact process and the involved components that caused this issue.

## Proposed Conventions

The following are proposed conventions that you could use or adept them to your needs, to enforce expressive error messages.

* Error message **MUST** be expressive and clear:
  * The cause of the error **MUST** be clearly defined if known.
  * The element of the system causing the error message **MUST** be clear for the reader.
  * Relevant context, e.g. IDs, entity type(s) and actor(s) **MUST** be included.
  * Information that reveals business secrets or poses security risks and GDPR violations **MUST NOT** be part of the information returned by the API.
  * Error codes **MUST** be human readable and memorable.
  * If the error message is translatable is a decision made by the service providing the API.

## Conclusion

By investing just some time to come up with proper error messages, you'll save the users of your program, API or library hours or even days of work and annoying research into why they've got that error. So you invest in developer experience and customer satisfactions, depending on what type of product and software you are working on.

One way you could test if your error messages are good is to ask the audience who will experience them later for their feedback. Give it a try, it's quick and easy to do!
