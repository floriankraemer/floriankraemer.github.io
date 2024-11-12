---
layout: page
title: Minimum Development Conventions
permalink: /minimum-development-conventions
---

The code quality impacts the business directly by being coupled and overly complex, causing a higher development effort and therefore costs for the business to produce and maintain the code.

Proper conventions ensure **code quality, maintainability, flexibility and scalability**, which directly impact a business's ability to evolve its software efficiently. Avoiding complex control structures, separating concerns, and minimizing dependencies reduce technical debt and risk, allowing teams to deliver features faster and with fewer bugs.

The following conventions are **a minimum** that I would strongly recommend *any* business to enforce in their projects. They are basic rules that are easy to apply and check via tools. The SOLID principles might require it to train the developers but its worth the effort. Even without deeper knowledge about patters and  design principles, they'll help to write less coupled and more cohesive code.

## Conventions

### Keywords

The keywords in this document follow [IETF RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119):

[1](https://datatracker.ietf.org/doc/html/rfc2119#section-1). **MUST**  This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.

[2](https://datatracker.ietf.org/doc/html/rfc2119#section-2). **MUST NOT**  This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.

[3](https://datatracker.ietf.org/doc/html/rfc2119#section-3). **SHOULD**  This word, or the adjective "RECOMMENDED", mean that there  may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.

[4](https://datatracker.ietf.org/doc/html/rfc2119#section-4). **SHOULD NOT**  This phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood and the case carefully weighed before implementing any behavior described with this label.

### List of Conventions

#### Comprehensibility, Simplicity, Code Quality

| Convention | Explanation |
| ----- | :---- |
| Else-Statements **MUST NOT** be used unless it is a technical necessity and can’t be avoided.  | Avoiding them **simplifies code** by reducing complexity and improving readability. It encourages clearer control flow, making the logic easier to follow and maintain. It is possible to avoid them, the else-statement must not be used. |
| Exceptions **MUST NOT** be used to control business logic.  | Using exceptions to control business logic leads to unclear and unpredictable flow, making the code harder to understand and maintain. **Exceptions must signal exceptional cases, not normal, expected conditions and states,** to keep the logic straightforward and focused on expected outcomes. |
| Methods **SHOULD NOT** be longer than 80 lines of code if it can be avoided. | Keeping methods under 80 lines promotes readability and encourages breaking down complex logic into smaller, reusable functions. This **improves code maintainability,** making it **easier to understand, test, and modify** individual components. **Exceptions:** Methods like toArray() and jsonSerialize() or *similar* data structure heavy methods are excluded. This exception is only valid if the method is doing nothing else. |
| Methods **MUST NOT** be longer than 120 lines of code if it is avoidable. | Same rationale as the row before.  **Exceptions:** Methods like toArray() and jsonSerialize() or *similar* data structure heavy methods are excluded. This exception is only valid if the method is doing nothing else. Exceptions can be made if the code can’t be split and has been reviewed by at least two persons. |
| Methods that return boolean **MUST** start with “is” or “has”. | Starting boolean-returning methods with "is" or "has" **improves code clarity** by making it immediately obvious that the method checks a condition. This naming convention enhances readability and aligns with common standards, making the code easier to understand and maintain. |
| Methods **SHOULD NOT** have more than 4 input arguments. | Limiting methods to 4 input arguments **simplifies their usage and improves readability**, making the code **easier to understand and maintain**. It encourages grouping related data into objects or structures, leading to cleaner and more modular designs that are less prone to errors during method calls. **Exceptions:**  Constructors are excluded. |
| Methods **MUST NOT** have more than 6 input arguments. | Limiting methods to 4 input arguments **simplifies their usage and improves readability**, making the code **easier to understand and maintain**. It encourages grouping related data into objects or structures, leading to cleaner and more modular designs that are less prone to errors during method calls. **Exceptions:** Constructors are excluded. |
| Methods **MUST** return as early as possible. | Also known as fail fast, methods must return as early as possible either their failure state or their success state. Deferring the return to the end of a method makes it often harder to follow and less expressive and therefore harder to maintain and understand. |

#### Architecture

| Convention | Explanation |
| ----- | :---- |
| Controllers and console commands **MUST NOT** implement business logic.  | Controllers and console commands should **focus on handling user input and application flow**, **not business logic**, to maintain separation of concerns. This keeps the architecture clean, making business logic reusable, testable, and easier to maintain across different parts of the system. |
| Mapping from raw input (CLI, Request, Messages) to DTOs **MUST** be done in a separate mapper class. | This decouples the logic from the application layer and different input channels. The mapper class **can be easily and quickly tested**.  **Exceptions:** The framework provides a way to auto-map input to a framework-agnostic DTO. |
| Business logic **MUST NOT** depend on framework classes.  | Business logic should be independent from frameworks to **avoid external dependencies**. This ensures **long-term stability, flexibility** in evolving the core logic, and **easier testing**. |
| Business logic **MUST NOT** depend on 3rd party libraries.  | Business logic should be independent of third-party libraries to **avoid external dependencies** that may introduce breaking changes or security risks. This ensures **long-term stability, flexibility** in evolving the core logic, and **easier testing** or replacement of third-party components. **Mitigation:** Hide them behind an interface that the organization owns and therefore controls. |
| Domain entities and domain services **MUST** implement business logic. | Domain entities must implement business logic to encapsulate behaviors and rules directly related to the domain. This **promotes a clear, cohesive representation of the business model**, ensuring that the **logic is centralized,** making the system more maintainable and aligned with Domain-Driven Design principles. |
| The [SOLID](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) principles **MUST** be followed. | The SOLID principles improve software design by promoting **maintainability**, **scalability**, and **flexibility**. They **help prevent tightly coupled code**, making it easier to modify, extend, and debug systems over time. This leads to cleaner, more robust architectures. [S \- Single-responsibility Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#single-responsibility-principle) (SRP) [O \- Open-closed Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#open-closed-principle) (OCP) [L \- Liskov Substitution Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#liskov-substitution-principle) (LSP) [I \- Interface Segregation Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#interface-segregation-principle) (ISP) [D \- Dependency Inversion Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#dependency-inversion-principle) (DIP) Further links: [SOLID Principles in PHP](https://franktheprogrammer.com/blog/php/solid-principles-in-php) [An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528) |

#### Testing

| Convention | Explanation |
| ----- | :---- |
| Tests **MUST** test only one case or scenario per test. | Tests must focus on **a single behavior or scenario** to ensure clarity and pinpoint failures effectively. This approach **makes it easier to identify issues, understand the purpose of the test**, and maintain the test suite over time, leading to **more reliable and understandable tests**. Don’t test a successful and negative outcome within the same test. Explicitly separate different outcomes in different tests. If an operation has three possible outcomes, all three must be tested in **separate** tests. |
| Tests **MUST** have an expressive name. | Test cases must have expressive names to clearly convey their purpose and the specific behavior being tested. This **enhances readability** and helps developers quickly understand what each test is verifying, **making it easier to identify and resolve failures**. For example, a test case named “shouldReturnTrueWhenUserIsActive” clearly indicates that the test checks the condition of an active user, while “testUserStatus” offers no insight into the tested functionality and could contain many cases. |
| Unit and integration tests **MUST** focus on testing business logic, behavior. | Testing business logic is essential to ensure that the core functionalities of the application behave as intended and meet the specified requirements. This **helps identify defects early**, maintain code quality, and build confidence in the system's reliability, ultimately **reducing the risk of costly errors** in production and enhancing user satisfaction. |
| Code **MUST** reach at least 75% *line* coverage. | Achieving at least 75% code coverage ensures that a significant portion of the codebase is tested, which helps **identify bugs and vulnerabilities early** in the development process. This level of coverage increases confidence in the software's reliability and stability, making it easier to maintain and evolve the code over time while minimizing the risk of regressions. This is the **minimal target.** |
| Code **MUST** reach at least 75% *branch* coverage. |  |
| Code **SHOULD** reach 85% *line* coverage. | [Following the Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle), reaching more will be a significant effort that is in most cases not justifiable compared to the incremental benefits gained. **80 to 85% coverage should be the target.** There is proof that this is working in practice and that the principle is not just a theory: [The vital few and trivial many: An empirical analysis of the Pareto Distribution of defects](https://subs.emis.de/LNI/Proceedings/Proceedings143/gi-proc-143-025.pdf) [Microsoft's CEO: 80-20 Rule Applies To Bugs, Not Just Features](https://www.crn.com/news/security/18821726/microsofts-ceo-80-20-rule-applies-to-bugs-not-just-features)  |
| Code **SHOULD** reach 85% *branch* coverage. |  |

#### Development Process

| Convention | Explanation |
| ----- | :---- |
| Legacy code that is touched during feature development **MUST** be refactored when it is touched. | Code that is touched during the development process must be refactored to increase the quality over time. Especially improving the readability of code by extracting functionality from large code blocks is easy by using “Extract Method” of modern IDEs. |
| Untested code **MUST** be tested before it can be changed, this must be visible in the commit history. | Changing untested code always bears risks. To mitigate those risks, code that is untested and needs to be changed must be tested before changes are made, to mitigate the probability of bugs. |
| Any legacy code **CAN** be refactored at any time. | The teams are free to do refactoring sessions whenever they want and they have time. Free resources should be allocated to refactoring. |
| Bug fixes **MUST** have test cases that cover all possible paths and scenarios within the affected code. | This convention will ensure that the risk of regressions is reduced. |
| Pre-Commit Hooks that check changed files **MUST** be used | This will ensure that the checks are executed fast and reduce the number of failing CI/CD builds.

## Rationale {#rationale}

The conventions are expected to be followed unless the author or reviewer of the code provides a **proper reasoning** for a violation. Assumptions and opinions are no arguments. The conventions are in most of the cases reasonable and achievable. There might be cases where a convention can’t be followed, but a reason must be given.

Valid reasons might be that a method is exceeding the line limit because of a long array declaration with many items (Why not move it to a property? Make it a separate data collection object? Could the items be objets as well? An array is fragile, an object is much less fragile) or when mapping large data structures. Sometimes a complex algorithm might require a deep nesting of if-else statements, but this is a rare occurrence as well, usually even then the statements can be broken down into separate methods with well understandable naming.

## Definition of Principle {#definition-of-principle}

A principle is a fundamental truth or guideline that **shapes behavior, actions, or thought**. It serves as a foundational rule or belief that **influences decision-making, providing consistency and direction**. Principles are often universal and **help individuals or groups align their choices** with a core set of values or goals. In essence, a principle acts as **a baseline for quality, coherence**, and purpose in actions or creations.

To express it in one simple sentence: Software engineering principles act as guardrails that steer the development towards certain quality attributes.

## The Impact on the Stakeholders {#the-impact-on-the-stakeholders}

### Accountability Definition {#accountability-definition}

Accountability is about being answerable for the outcomes of tasks or projects. While multiple people may share responsibility, only one person or a specific role is usually accountable for the final result.

### Responsibility Definition {#responsibility-definition}

Responsibility refers to the specific tasks, roles, and actions that team members are expected to perform. It implies ownership of processes, such as coding, testing, or managing infrastructure.

Responsibilities can often be shared among team members, as multiple developers may be responsible for implementing different features, while multiple QA engineers may be responsible for different testing phases.

### Impacted Roles

| Who is impacted? | What is the impact? |
| :---- | :---- |
| **Tech Leads** | Will be ***responsible*** for communicating and if necessary, teaching the conventions to their teams. Will be ***accountable*** for upholding the conventions within their team. |
| **Architecture** | Will be ***responsible*** to help the teams if necessary and requested by the development teams. |
| **Architecture & Engineering** | Will be ***responsible*** to provide training, internal (architecture) or external (Engineering) if there is a request made by a development team. |
| **Everyone who writes or changes code** | **Developer Experience:** Easier to read and understand code should also have **a positive impact on the developer experience**, because when the code is easier to understand and maintain, the likelihood of tedious bugs and hours of understanding the code should decrease. Will be ***responsible*** and ***accountable*** for learning the SOLID principles. Will be ***accountable*** for not following the conventions. |
| **Product Owners & Managers** | Are ***informed*** about the conventions and measures to enforce them. |

## The Impact on the System {#the-impact-on-the-system}

Clear, standardized practices also improve collaboration across developers, leading to more reliable systems because it reduces the time it takes to understand and change code. The expectation is that the system's flexibility will increase over time if the conventions are applied consistently.

## The Impact on the Business {#the-impact-on-the-business}

The short term impact may be a slower development speed due to the expected learning phase. The business should give the development teams time and room to adapt to the changes this RFC will introduce. The mid term benefit should be visible in an increased development speed and less defects in the long term. The long term perspective and expectation is a reduction in the production and maintenance costs of the code and also increased flexibility.

# References {#references}

1. [Coding conventions \- Wikipedia](https://en.wikipedia.org/wiki/Coding_conventions)  
2. [SOLID \- Wikipedia](https://en.wikipedia.org/wiki/SOLID)  
3. [An Experimental Evaluation of the Effect of SOLID Principles to Microsoft VS Code Metrics](https://dergipark.org.tr/en/download/article-file/1555528) by Osman Turan, Ömer Özgür, 2018  
4. [Investigating the Impact of SOLID Design Principles on Machine Learning Code Understanding](https://arxiv.org/pdf/2402.05337) by Raphael Cabral, Hugo Villamizar, Marcos Kalinowski, Tatiana Escovedo, Maria Teresa Baldassarre, Hélio Lopes Rio de Janeiro, 2024  
5. [An Experimental Assessment on Effects of Solid Design Principles on the quality of Software using CKJM Metric Analysis](https://www.ijraset.com/research-paper/an-experimental-assessment-on-effects-of-solid-design) by Bhaumik Tyagi, Yusra Beg, 2022  
6. [Effect of SOLID Design Principles on Quality of Software: An Empirical Assessment](https://www.ijser.org/researchpaper/Effect-of-SOLID-Design-Principles-on-Quality-of-Software-An-Empirical-Assessment.pdf) by Harmeet Singh, Syed Imtiyaz Hassan, 2015