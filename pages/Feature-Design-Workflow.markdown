# Feature Design Workflow

## Introduction

## Intended Audience

## 🏭 Workflow

### Involved Roles

## 🧠 Rationale

Why is the feature design process and template useful? How does it help?

### A Blueprint for Development

The feature design workflow should generate an artifact that serves as a detailed blueprint that guides developers through the implementation of a new feature or system. It outlines the technical specifications, architectural designs, and functional requirements, ensuring that all team members have a clear and consistent understanding of what needs to be built and how.

### A Communication Tool

It acts as a communication tool among various stakeholders, including developers, project managers, designers, and clients. It ensures that all parties have a shared understanding of the project scope, goals, and requirements, facilitating collaboration and alignment. The document should be the single source of truth during development.

### Risk Management

It helps in identifying potential risks and defining mitigation strategies. By thoroughly documenting the design, potential challenges and risks can be identified early, allowing for proactive planning to address them.

### Decision Making

It supports informed decision making by providing a detailed analysis of different design options, including pros and cons, allowing stakeholders to make informed decisions based on a comprehensive understanding of the implications.

## 📑 Guidelines

The guidelines **SHOULD** be followed, but they are not hard rules.

### Generic Advice

* Writing good documents is hard, don’t get frustrated too early! Ask your colleagues for feedback, ask them if everything is clear, well understandable or if they think that you forgot something. This is a collaborative process!

* Advice for tech people: Look at the process as if you would write a program with natural language, it should follow a clear structure, solve a problem and the output should be a clear result and not ambiguous or random. The technical implementation will be the solution of the problems identified in the process.

* Always try to think about who needs to do what, when for what reason? Who needs something? Something can be information, training, hardware resources, AWS resources, approvals etc How can you get them that? What do you need from other stakeholders for what reason?

### Language & Structure

* Avoid personal forms like “I want to…” use “Your Company Name” or “The company” or team names.
* Do not propose, guess or suggest, **be precise and clearly define** what you want or don’t want.
* Be as objective as you can, avoid subjective ratings.
* Try to be short but very clear and on point.
* Don’t mix the status quo with the problem – a problem is the consequence of the status quo.
* Don’t mix different concerns within a section or paragraph, stay focused, use a new section for a different concern.

> 🎓 Google provides some public and [free information](https://developers.google.com/tech-writing/one) regarding how to write technical documentation. Sometimes they even provide free courses. Check it out!

### When to write a feature design document?

Anything that requires alignment and coordination with other services and teams should be carefully evaluated if it needs a design document. This decision MUST be made together with the other stakeholders and must not be made by a single person.

Something that is not a feature but will improve an application or team without side-effects on other teams or applications can be solved within the team by a more simple ADR.

Something that is not a feature but will impact other applications or teams directly or has side-effects on other teams or applications should be addressed via an RFC.

## Use Decision Tables

* Use [decision tables](https://en.wikipedia.org/wiki/Decision_table) to figure out the best option.
* Use quality attributes for them whenever possible.
* Consider the company's primary quality attributes.
* Do not just use “yes/no” but provide a short but meaningful rationale in the fields of the table if the answer can’t be a simple yes or no.

<style>

</style>

<table class="uc-table">
    <thead>
        <tr>
            <th>
                Attributes
            </th>
            <th>
                <b>Solution #1</b>
            </th>
            <th>
                <b>Solution #2</b>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                Flexibility
            </td>
            <td>
                test
            </td>
            <td>
                test
            </td>
        </tr>
        <tr>
            <td>
                Scalability
            </td>
            <td>
                test
            </td>
            <td>
                test
            </td>
        </tr>
        <tr>
            <td>
                Afforadbility - Initial cost
            </td>
            <td>
                test
            </td>
            <td>
                test
            </td>
        </tr>
        <tr>
            <td>
                Afforadbility - Maintenance cost
            </td>
            <td>
                test
            </td>
            <td>
                test
            </td>
        </tr>
    </tbody>
</table>

## 🏆 Goal & Expected Outcome

The goal is **not to plan every single detail** of the implementation but to have a holistic view of the system and the impact of the changes to the system a new feature requires. The business and the development department should be aware of large scale problems and possible obstacles and not discover them during the development. Some discoveries and problems inevitable will come up anyway and have to be dealt with when they come up. The goal is not to foresee every possible problem, but to avoid **most** of them, that could be avoided by thinking about the task at hand before jumping into the implementation. The requirements should be clear and understood before the design document is written.

The expected outcome is that all relevant elements of the system that will be involved were identified, gaps and problems were identified and all required stakeholders were informed and involved in the process if needed.

How the elements interact should have been identified, the impact of the interaction and the consequences for the existing system, teams and individuals. A change to the system should make the system better, not worse, therefore an understanding of the changes is required before implementing it.

It is not expected to figure out every single detail and to catch every exception. The process should be iterative and the document must be updated when new discoveries are made during the development.

The first revision that is reviewed and accepted by the reviewer(s) MUST provide a level of detail that is sufficient to avoid bigger problems as best as possible that will impact teams and services in an unintended way or lead to a degradation of the systems quality.

The who, what and when should be clear for all involved elements of the system and all people involved.

## 🚨 Conventions

The conventions are considered to be hard rules that MUST be enforced by the drivers of the initiative.

* A new feature MUST have a design document except the stakeholders agree that the complexity is not sufficient to justify the effort of creating the design document.
* The decision to not create a feature design document MUST be made by at least one stakeholder from technology and one from the business.
* The design document MUST be the single source of truth for the concerns it addresses.
* The design document MUST be reviewed by another person before the implementation.
* The design document MUST NOT be maintained after the successful delivery of the feature.
* The design document CAN change during the development process.
* Changes that impact the development severely MUST be reviewed or decided by an ADR, depending on the subject at hand.
* The design document SHOULD NOT describe concrete implementations (code) of components.
* There MAY be exceptions like choosing and explaining a very specific algorithm.