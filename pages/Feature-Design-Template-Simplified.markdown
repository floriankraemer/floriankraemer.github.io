# \<title\>

| Owner(s) / Driver(s) | \<name(s)\> |
| :---- | :---- |
| **Last reviewed on** | \<date\> |
| **Reviewed by** | \<name(s)\> |
| **Epic / Ticket** | \<ticket-number-with-link\> |

| If you are unfamiliar with this template read this document first: [Feature Design Workflow](https://docs.google.com/document/d/1qIwF1ZbKaZifWKleRCruBTMukofzSiWYJn7uc8lntHI/edit#heading=h.n4veb06qgv8o) |
| :---- |

| This document MUST be updated during the development of the feature it describes.  It SHOULD NOT be maintained once the feature has been delivered.  The delivered feature MUST match the document and vice versa. ℹ️  Remove the blue info boxes from your copy of the template before handing it over for review\! |
| :---- |

- [\<title\>](#title)
- [Overview {#overview}](#overview-overview)
  - [Purpose {#purpose}](#purpose-purpose)
  - [Scope {#scope}](#scope-scope)
  - [Stakeholders {#stakeholders}](#stakeholders-stakeholders)
- [Requirements {#requirements}](#requirements-requirements)
  - [Functional Requirements {#functional-requirements}](#functional-requirements-functional-requirements)
  - [Technical Requirements {#technical-requirements}](#technical-requirements-technical-requirements)
- [Design {#design}](#design-design)
  - [Architecture {#architecture}](#architecture-architecture)
  - [Architectural Decisions Records {#architectural-decisions-records}](#architectural-decisions-records-architectural-decisions-records)
  - [API Design {#api-design}](#api-design-api-design)
- [Testing {#testing}](#testing-testing)
  - [Test Plan {#test-plan}](#test-plan-test-plan)
- [Development Plan {#development-plan}](#development-plan-development-plan)
- [Risks \& Mitigations {#risks-\&-mitigations}](#risks--mitigations-risks--mitigations)
- [Resources {#resources}](#resources-resources)

# Overview {#overview}

## Purpose {#purpose}

| ℹ️ Explain the purpose of the functionality and what it aims to achieve. This addresses the “why”. What business goal is addressed? What is the business value this will generate? This should be filled in collaboration with the product owner. |
| :---- |

## Scope {#scope}

| ℹ️ Describe the scope of the feature, including what will and will not be covered.  This addresses the “what” and “how” This should be filled in collaboration with the product owner. |
| :---- |

## Stakeholders {#stakeholders}

| ℹ️ Who is involved in what role? Link the names via @\<name\>  Who is leading this initiative from a technical point of view? Who is leading it from the business point of view? Who started this initiative? A stakeholder can also be a team or company. What third parties are involved? E.g. if the USEF can influence something related to this document they are a stakeholder. There MUST BE at least one responsible tech lead and one responsible PO who is able to make final decisions. |
| :---- |

* \<name\> Product Owner  
* \<name\> Tech Lead  
* \<name\> \<role\>

# Requirements {#requirements}

| ℹ️ One line MUST have only one requirement. NFRs are usually driven by [quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes), ideally prefixing each line with the related quality attribute. Use keywords (SHOULD, MUST, CAN, MUST NOT, etc) to indicate requirements levels. See [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt). It is *recommended* to enumerate them manually to be able to address them by an ID e.g. RQ1 and to see what was removed. Also, strike-through removed requirements, so you don’t have to re-order your IDs and that it is clear for the reader that a requirement was removed. |
| :---- |

## Functional Requirements {#functional-requirements}

* List and describe all the functional requirements for the feature.

## Technical Requirements {#technical-requirements}

* Specify any technical requirements, such as platforms, frameworks, and dependencies. This could also include that we need to train people in tools or processes.

# Design {#design}

## Architecture {#architecture}

| ℹ️ Describe the overall architecture of the feature, including how it fits into the existing system.  It is strongly recommended to draw at least an overview diagram for this section. The flow of messages (e.g. events, commands queries), the involved systems and components should be documented on a high level. |
| :---- |

## Architectural Decisions Records {#architectural-decisions-records}

| ℹ️ The evaluation and selection of new tools, processes and 3rd party services and libraries should be data driven evaluated in the form of an [ADR](https://github.com/joelparkerhenderson/architecture-decision-record) that is linked to this feature. If no ADRs were written this MUST be stated instead of removing this section. |
| :---- |

* Title (linked to ADR)

## API Design {#api-design}

| ℹ️ At least the public API for HTTP APIs, Messages and Module Interfaces MUST be mentioned before implementation starts and be reviewed. Whatever the main entry points to your components are that intersect with other systems.  This can be also an Open API document that is linked here but also events you trigger or consume. All of that should be mentioned here. It doesn’t have to be perfect but it should provide a sufficient solution. The API design can be refined during the development. |
| :---- |

# Testing {#testing}

## Test Plan {#test-plan}

| ℹ️ What type of testing must be implemented for what component of the system? E.g. Unittest, E2E, Integration, [CDC](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/cdc-testing/)? What tool will be used for testing? You don’t have to list every file but for example “All classes in namespace X” or “User story X”. |
| :---- |

| Type | Tool | Component / API | Notes / Links |
| :---- | :---- | :---- | :---- |
|  |  |  |  |

# Development Plan {#development-plan}

| ℹ️ Break the development into manageable steps and describe who needs to do what and when. Consider that some tasks depend on other things that must be done first. Align this plan with your product owner or engineering manager. Estimates MUST be provided in hours or person days (PD) with a confidence level in percent. E.g. if you estimate 5 PD and your confidence is 50% percent, then this could mean you’ll finish it \+/- 2.5 PD. The goal here is not to be perfectly accurate, but to get an overall idea of how much time it will take to develop the feature. This is important information for project management. |
| :---- |

| \# | Estimate | When | Responsible | Ticket | What | Dependson \# |
| :---: | :---- | :---- | :---- | :---- | :---- | :---: |
| 1 | 0.25h / 90% | 2024-10-01 | [Florian Krämer](mailto:f.kraemer@clipmyhorse.tv) | Link | Add the conventions to the architectural conventions page. |  |
|  |  |  | Person |  |  |  |
|  | **Total:** x PD |  |  |  |  |  |

# Risks & Mitigations {#risks-&-mitigations}

| ℹ️ Describe possible risks and provide a plan to mitigate them. A risk could be for example that ½ of a team is on vacation and we can’t deliver in time. Another risk might be the lack of knowledge in a certain area. If there are no risks then mention that explicitly and do not just remove this section. |
| :---- |

# Resources {#resources}

| ℹ️ A list of items, articles, videos, whatever, that support this document or are research artifacts. |
| :---- |

* Resource
