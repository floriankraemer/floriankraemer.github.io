# \<title\>

| Owner / Driver(s) | \<name(s)\> |
| :---- | :---- |
| **Last reviewed on** | \<date\> |
| **Reviewed by** | \<name\> |
| **Epic / Ticket** | \<ticket-number-with-link\> |

| If you are unfamiliar with this template read this document first: [Feature Design Workflow](https://docs.google.com/document/d/1qIwF1ZbKaZifWKleRCruBTMukofzSiWYJn7uc8lntHI/edit#heading=h.n4veb06qgv8o) |
| :---- |

| This document MUST be updated during the development of the feature it describes.  It SHOULD NOT be maintained once the feature has been delivered.  The delivered feature MUST match the document and vice versa. ℹ️  Remove the blue info boxes from your copy of the template before handing it over for review\! |
| :---- |

- [\<title\>](#title)
- [Introduction {#introduction}](#introduction-introduction)
  - [Scope \& Purpose {#scope-\&-purpose}](#scope--purpose-scope--purpose)
  - [Stakeholders {#stakeholders}](#stakeholders-stakeholders)
  - [Terminology {#terminology}](#terminology-terminology)
- [Requirements {#requirements}](#requirements-requirements)
  - [Functional Requirements {#functional-requirements}](#functional-requirements-functional-requirements)
  - [Non-Functional Requirements {#non-functional-requirements}](#non-functional-requirements-non-functional-requirements)
  - [Technical Requirements {#technical-requirements}](#technical-requirements-technical-requirements)
- [Design {#design}](#design-design)
  - [Architecture {#architecture}](#architecture-architecture)
  - [Component Design {#component-design}](#component-design-component-design)
  - [Data Model {#data-model}](#data-model-data-model)
  - [Architectural Decisions Records {#architectural-decisions-records}](#architectural-decisions-records-architectural-decisions-records)
  - [API Design {#api-design}](#api-design-api-design)
- [Testing {#testing}](#testing-testing)
  - [Test Cases {#test-cases}](#test-cases-test-cases)
  - [Test Plan {#test-plan}](#test-plan-test-plan)
- [Migration Strategie {#migration-strategie}](#migration-strategie-migration-strategie)
- [Risks \& Mitigations {#risks-\&-mitigations}](#risks--mitigations-risks--mitigations)
- [Development Plan {#development-plan}](#development-plan-development-plan)
- [Resources {#resources}](#resources-resources)

# Introduction {#introduction}

## Scope & Purpose {#scope-&-purpose}

| ℹ️ Explain the purpose of the functionality and what it aims to achieve. Describe the scope of the feature, including what will and will not be covered. |
| :---- |

## Stakeholders {#stakeholders}

| ℹ️ Who is involved in what role? Link the names via @\<name\>  Who is leading this initiative from a technical point of view? Who is leading it from the business point of view? Who started this initiative? A stakeholder can also be a team or company. What third parties are involved? E.g. if the USEF can influence something related to this document they are a stakeholder. |
| :---- |

* \<name\> \<role\>

## Terminology {#terminology}

| ℹ️ Explain ambiguous terminology or terms that aren’t well known. Do not assume that everyone knows the same term or that the same term has the same meaning for different people and different contexts\! Provide a short but clear description. |
| :---- |

| Term | Abbreviation | Synonyms | Description |
| ----- | ----- | ----- | ----- |
| **Video On Demand** | VoD | \- | VoD describes the ability to stream a video file from an archive async on the website of CMH. |
|  |  |  |  |

# Requirements {#requirements}

| ℹ️ One line MUST have only one requirement. NFRs are usually driven by [quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes), ideally prefixing each line with the related quality attribute. Use keywords (SHOULD, MUST, CAN, MUST NOT, etc) to indicate requirements levels. See [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt). It is *recommended* to enumerate them manually to be able to address them by an ID e.g. RQ1 and to see what was removed. Also, strike-through removed requirements, so you don’t have to re-order your IDs and that it is visible for the reader that a requirement was removed. |
| :---- |

## Functional Requirements {#functional-requirements}

* List and describe all the functional requirements for the feature.

## Non-Functional Requirements {#non-functional-requirements}

* List and describe all the non-functional requirements (e.g., performance, security, usability).

## Technical Requirements {#technical-requirements}

* Specify any technical requirements, such as platforms, frameworks, and dependencies. This could also include that we need to train people in tools or processes.

# Design {#design}

## Architecture {#architecture}

| ℹ️ Describe the overall architecture of the feature, including how it fits into the existing system.  It is strongly recommended to draw at least an overview diagram for this section. The flow of messages (e.g. events, commands queries), the involved systems and components should be documented on a high level. |
| :---- |

## Component Design {#component-design}

| ℹ️ Provide detailed designs for the components of the feature. Depending on the components and what you need to archive. Use [component diagrams](https://en.wikipedia.org/wiki/Component_diagram) and [sequence diagrams](https://en.wikipedia.org/wiki/Sequence_diagram). Consider extracting the component designs into separate pages and link them here in a list. |
| :---- |

## Data Model {#data-model}

| ℹ️ Include diagrams and descriptions of the data model, including database schema changes. |
| :---- |

## Architectural Decisions Records {#architectural-decisions-records}

| ℹ️ The evaluation and selection of new tools, processes and 3rd party services and libraries should be data driven evaluated in the form of an ADR that is linked to this feature. |
| :---- |

* Title (linked to ADR)

## API Design {#api-design}

| ℹ️ Either show the interface of a module or API. Whatever the main entry points to your components are. This can be also an Open API document that is linked here but also events you trigger or consume. All of that should be mentioned here. It doesn’t have to be perfect but it should provide a sufficient solution. The API design will be refined during the development. |
| :---- |

# Testing {#testing}

## Test Cases {#test-cases}

| ℹ️ A list of test cases. If there are none, mention that and provide a rationale of why there aren’t test cases. |
| :---- |

## Test Plan {#test-plan}

| ℹ️ What type of testing must be implemented for what component of the system? E.g. Unittest, E2E, Integration, [CDC](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/cdc-testing/)? What tool will be used for testing? You don’t have to list every file but for example “All classes in namespace X” or “User story X”. |
| :---- |

| Type | Tool | Component | Notes / Links |
| :---- | :---- | :---- | :---- |
|  |  |  |  |

# Migration Strategie {#migration-strategie}

| ℹ️ If any migrations are needed describe them here. |
| :---- |

# Risks & Mitigations {#risks-&-mitigations}

| ℹ️ Describe possible risks and provide a plan to mitigate them. A risk could be for example that ½ of a team is on vacation and we can’t deliver in time. Another risk might be the lack of knowledge in a certain area. If there are no risks then mention that explicitly and do not just remove this section. |
| :---- |

# Development Plan {#development-plan}

| ℹ️ Break the development into manageable steps and describe who needs to do what and when. Consider that some tasks depend on other things that must be done first. Align this plan with your product owner or engineering manager. Estimates MUST be provided in hours or person days (PD) with a confidence level in percent. E.g. if you estimate 5pd and your confidence is 50% percent, then this could mean you’ll finish it \+/- 2.5 PD. The goal here is not necessarily perfect accuracy but to get an overall idea of how much time it will take to develop the feature. |
| :---- |

| \# | Estimate | When | Responsible | Ticket | Task | Dependson \# |
| :---: | :---- | :---- | :---- | :---- | :---- | :---: |
| 1 | 0.25h / 90% | Right after the RFC was accepted. | [Florian Krämer](mailto:f.kraemer@clipmyhorse.tv) | Link | Add the conventions to the architectural conventions page. |  |
|  |  |  | Person |  |  |  |
|  | **Total:** x PD |  |  |  |  |  |

# Resources {#resources}

| ℹ️ A list of items, articles, videos, whatever, that support this document or are research artifacts. |
| :---- |

* Resource

