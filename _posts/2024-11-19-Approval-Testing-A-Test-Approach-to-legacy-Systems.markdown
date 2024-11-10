---
layout: post
title: 'Approval Testing - An Approach for (not only) Legacy Systems'
categories: software-architecture
tags:
  - software-architecture
  - testing
  - software-testing
date: 2024-11-19T01:13:30.000Z
draft: false
published: true
comments: true
---

I'm once again in a situation where I need to work with a ~14-year-old, organically grown system consisting of three larger applications and numerous smaller services (primarily AWS Lambda functions). The entire project began with just two people.

History repeats itself, and it’s unsurprising that these applications suffer from tight coupling—even across boundaries—by, for instance, sharing parts of one of the many databases in use. In my experience, it's rare for startups, especially those founded 10-20 years ago, to begin with well-designed systems. Early growth and rapid results are often prioritized to secure further investment over creating a robust architecture. Fair enough. The long-term impact of failing to address this in the mid-to-long term, however, is worth a separate discussion.

What makes such systems especially difficult to work with is their typical lack of adequate tests and test coverage. As a result, it's nearly impossible to make changes confidently without risking unintended breakages. This raises the question of how to quickly develop sufficient tests to gain confidence that changes won’t disrupt other parts of the system.

Approval tests will help us here.

## What is Approval Testing?

Approval testing is a distinct approach within the software testing landscape that focuses on verifying complex system outputs by comparing them to a pre-approved baseline. Unlike traditional unit testing, which relies on specific assertions, approval testing involves generating output from the code and saving it as a reference point. Future tests then compare the system’s output against this "approved" version, and any discrepancies are flagged for review. This technique is especially valuable when output is too intricate for simple assertions, such as visual UI components or large data structures, making it a powerful tool for ensuring system behavior remains consistent.

Approval testing is increasingly popular because it excels in scenarios where traditional assertions fall short, particularly when dealing with complex or non-deterministic outputs. Systems that produce extensive or dynamic results—like rendering large reports, processing machine learning models, or generating HTML—are difficult to validate with line-by-line assertions. Approval testing allows developers to review the overall output holistically, ensuring the output aligns with expectations even when it isn't practical to define precise conditions upfront. This flexibility makes it an ideal solution for testing legacy code, refactoring efforts, and systems that generate varying results based on external factors.

## How Approval Testing Works

![Stamping Code Illustration](/assets/images/illustrations/stamping-approval.jpg){: .align-right}

Approval testing works by comparing the current output of software to an approved baseline, often referred to as a "golden master." This baseline is established during the initial run of the test, where the output is manually reviewed and marked as the correct or expected result, hence the name "Approval Testing."

Future tests generate new outputs and automatically compare them against this baseline. If the outputs match, the test passes, confirming the system behaves as expected. If they differ, the test fails, and the differences are flagged for review. This approach ensures that any unintended changes to the system's behavior are caught early, making approval testing particularly effective in maintaining consistency in complex systems.

While assertions check specific conditions, approval testing checks broader, less deterministic results.

## Example (Java)

The example is using [the approval testing library for Java](https://github.com/approvals/ApprovalTests.Java).

```java
import org.approvaltests.Approvals;
import org.junit.jupiter.api.Test;

public class ApprovalTestExample {

    public String formatMessage(String name, int age) {
        return "Name: " + name + ", Age: " + age;
    }

    @Test
    public void testFormatMessage() {
        String result = formatMessage("John Doe", 30);
        Approvals.verify(result); // Thats all!
    }
}
```

## Tools and Frameworks

There is [a whole website](https://approvaltests.com/) available that provides links to approval testing libraries in many languages:

[Java](https://github.com/approvals/approvaltests.java), [C#](https://github.com/approvals/approvaltests.net), [C++](https://github.com/approvals/approvaltests.cpp), [PHP](https://github.com/approvals/approvaltests.php), [Python](https://github.com/approvals/approvaltests.python), [Swift](https://github.com/approvals/approvaltests.swift), [NodeJS](https://github.com/approvals/Approvals.NodeJS), [Perl](https://github.com/approvals/ApprovalTests.perl), [Go Lang](https://github.com/approvals/go-approval-tests), [Lua](https://github.com/approvals/ApprovalTests.lua), [Objective-C](https://github.com/approvals/ApprovalTests.Objective-C) , [Ruby](https://github.com/approvals/ApprovalTests.Ruby), [Labview](https://github.com/approvals/ApprovalTests.LabVIEW), [Dart](https://github.com/approvals/ApprovalTests.Dart), [Elixir](https://github.com/approvals/Approvaltests.Elixir)

## Benefits of Approval Testing

* Easier maintenance for complex outputs.
* Improves test coverage without writing exhaustive assertions.
* Facilitates collaboration and communication within teams.

## Potential Drawbacks and Considerations

* The approval tests can become a bottleneck if the baseline is frequently updated or overly broad.
* Minor changes to the system can lead to frequent failures, requiring human intervention to review and approve.
* Won't work well with random or frequently changing output e.g. by importing data from a live system to the test systems database.

## Conclusion

Approval testing offers a valuable addition to traditional assertion-based testing techniques by addressing cases where conventional tests are either too rigid or difficult to maintain. In scenarios involving complex outputs—such as rendered UIs, large text reports, or intricate data structures—writing detailed assertions can be cumbersome and prone to error. By focusing on the full output rather than isolated values, approval testing provides a more flexible and maintainable testing strategy for handling complex system behavior.

For developers working with legacy codebases, approval testing can be a particularly powerful tool. Legacy code often lacks comprehensive test coverage, making it risky to modify or refactor without introducing unintended changes.

Approval testing allows developers to capture the current behavior of the system and lock it down, providing a safeguard against regressions during refactoring. Similarly, for systems that generate non-deterministic outputs—like those involving machine learning models or dynamically generated content—approval testing's ability to capture and compare large outputs is invaluable. Exploring approval testing in these contexts can dramatically improve test coverage and system stability without the overhead of managing hundreds of individual assertions.
