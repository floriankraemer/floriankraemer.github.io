---
layout: post
title: "Simple but useful: Use Case Tables"
categories: software-architecture
tags: software-architecture
draft: false
comments: true
---

During my work I faced the problem, that in communication with product managers, there was often no unified format in which information was communicated.

Yes, there are many other tools, like user flow diagrams, BPMN diagrams, and more. However, all of them require some training and express the intention mostly in a visual fashion. The problem with user stories is, they are not formalized and kind of hard to talk about, because they lack the necessary details to address a specific point without getting into explaining what exactly you mean. If you don’t get what I’m trying to explain at this point, wait until you get to the used case tables. In my opinion, using case tables is a good compromise between diagrams expressing just the flow and free-style user stories. The advantage is that they are formalized, and you can easily address a specific use case and step or exception, because everything is annotated with identifiers and structured in the same way.

This article is mostly based on my experience with use cases and this very nice paper, *[Empirical Evaluation and Review of a Metrics-Based Approach for Use Case Verification](https://www.researchgate.net/publication/220536177_Empirical_Evaluation_and_Review_of_a_Metrics-Based_Approach_for_Use_Case_Verification)* by Beatriz Bernárdez Amador, Durán Toro and Marcela Genero.

## Example Use Case Table from the Paper

![Validation through the Layers Diagram](/assets/images/use-case-example.png){: .align-center}

## Suggested Guidelines for writing use cases

These guidelines are taken from the results of this research paper and they work fine in my experience.

* The number of steps **SHOULD** be between **3** and **9**.
  * A use case with just a few steps is likely to be incomplete.
  * Too many steps usually indicate a too low level of detail and make the use case too complex to be understood and defect—prone.
* Use case steps that refer to other use cases **SHOULD NOT** go beyond **25%**, ideally, it is **0%**. Abusive use of use case relationships makes use cases difficult to understand - customers and users are not amiliar with procedure call semantics. Use them to avoid repetition of common steps only.
* A use case describes the system-actor interactions, so the rate of actor and system steps **SHOULD** be around **50%**, considering also steps whose action is either an inclusion or an extension from another use case.

## Suggested Rules for working with Use Case Tables

These rules are suggested to be used when working with the use case tables. They are pretty strict but should be easy to remember once you applied them a few times.

* UC-1 top left **MUST** be a sequential ID, enumerating the UCs to be able to easily identify them and refer to them.
* The prefix **CAN** be anything, but it is recommended to use something that makes in the context of the domain. e.g. PD-UC-I, PD for "Product".
* A title **MUST** be provided.
  * It **SHOULD** be *short* and not be a complete explanation of something.
* The author **MUST** be named.
* Pre-conditions **MUST** be listed as an enumerated list to be able to easily identify one of the conditions.
* The description **MUST** only be used for context and additional information that doesn't fit well in any other part of the template.
  * It is **NOT** required to be filled.
* The steps of a use case **MUST** be written as a sequence in the correct order.
* Each step **MUST** describe only *one* action.
* Each step **MUST** name the actor that is performing an action.
* Post-conditions **MUST** be listed as an enumerated list to be able to easily identify one of the conditions.
* Exceptions **MUST** refer to the step in which they occur.
  * One row **MUST** only describe one exception.
* The comments field **MUST** state "None" if there are no comments to make it clear that there are none. Leaving it empty leaves room for guesses if it was not filled or if there are none.
* Additional information and diagrams **CAN** be added.
  * That information **MUST** be added after the UC table, not before, not anywhere inside.
* The references field **MUST** state "None" if there are no references to make it clear that there are none. Leaving it empty leaves room for guesses if it was not filled or if there are none.
  * If there are references to something, a bullet list **MUST** be used to list them, even a single one.
  * References **SHOULD** be only links or unique identifiers.

## Use Case Table - HTML Version + Additions

The example table from the paper is almost good! There are just a few recommended adaptations.

1. Enumerate the pre-conditions, there can be more than one.
2. Enumerate the post-conditions, there can be more than one.
3. Add an "Actor(s)" row to list all actors.
4. Add a row for "References", links to supplemental documents and resources.

<style>
.uc-table {
    text-align: left;
    vertical-algin: top;
    font-size: 0.95rem;
}
.uc-table td {
    vertical-align: top;
    border: 1px solid #464646;
    padding: 8px;
}
.uc-table ol  {
    margin: 0px 20px 0px 20px;
}
.uc-table ul {
    margin: 0px 20px 0px 20px;
}
.uc-table tr:nth-child(even) {
    background-color: #fff;
}
.uc-table tr:nth-child(odd) {
    background-color: #fff;
}
.uc-table .first {
    width: 150px;
    font-weight: bold;
    background-color: #dcddde;
}
.uc-table td.step {
  text-align: center;
}
</style>

<table class="uc-table">
    <tr>
        <td class="first">
            UC-0015
        </td>
        <td colspan="2">
            <b>Register Book Loan</b>
        </td>
    </tr>
    <tr>
        <td class="first">
            Dependencies
        </td>
        <td colspan="2">
            <ul>
                <li>OBJ-0001 To manage book loans (objective)</li>
                <li>OBJ-0005 To know library users preferences (objective)</li>
                <li>CRQ-0003 Minimum number of simultaneous loans (business rule)</li>
                <li>CRQ-0013 Return date for a loan (business rule)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td class="first">
            Author(s)
        </td>
        <td colspan="2">
            John Doe
        </td>
    </tr>
    <tr>
        <td class="first">
            Description
        </td>
        <td colspan="2">
            The system shall behave as described in the following use case When a library user requests a loan of one or more books.
        </td>
    </tr>
        <tr>
        <td class="first">
            Actor(s)
        </td>
        <td colspan="2">
            Librarian, Library User, System
        </td>
    </tr>
    <tr>
        <td class="first">
            Pre-Conditions
        </td>
        <td colspan="2">
            <ol style="margin: 0px 20px 0px 20px;">
                <li>The library user has been identified by means of his or her identity card.</li>
                <li>The has library user picked up the books to loan from the shelves.</li>
                <li>The library user has not reached the maximum number of simultaneous loans and has no penalty.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td class="first" rowspan="10">
            Ordinary Sequence
        </td>
        <td class="step">
            Step
        </td>
        <td>
            Action
        </td>
    </tr>
        <tr>
        <td class="step">
            1
        </td>
        <td>
            Actor librarian requests the system for starting the book loan registering process.
        </td>
    </tr>
        <tr>
        <td class="step">
            2
        </td>
        <td>
            The <b>system</b> requests for the identification Of the library user requesting a loan.
        </td>
    </tr>
        <tr>
        <td class="step">
            3
        </td>
        <td>
            Actor librarian provides identification data of the library user to the system.
        </td>
    </tr>
        <tr>
        <td class="step">
            4
        </td>
        <td>
            The system requests for the identification of the books to be loaned.
        </td>
    </tr>
        <tr>
        <td class="step">
            5
        </td>
        <td>
            Actor librarian provides identification data of the books to be loan to the system.
        </td>
    </tr>
        <tr>
        <td class="step">
            6
        </td>
        <td>
            The system displays the return date for each of the books to be loan and requests loan confirmation for each of them.
        </td>
    </tr>
        <tr>
        <td class="step">
            7
        </td>
        <td>
            Actor library user confirms the librarian which books he or she wants to loan after knowing return dates.
        </td>
    </tr>
        <tr>
        <td class="step">
            8
        </td>
        <td>
            Actor librarian re—conjirms the book loans confirmed by the library user to the system.
        </td>
    </tr>
        <tr>
        <td class="step">
            9
        </td>
        <td>
            The system informs that the book loans have been successfully registered.
        </td>
    </tr>
    <tr>
        <td class="first">
            Post-Conditions
        </td>
        <td colspan="2">
            <ol style="margin: 0px 20px 0px 20px;">
                <li>The library user can take the loaned books awav and the system has registered the book loans.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td class="first">
            Exceptions
        </td>
        <td class="step">
            Step
        </td>
        <td>
            Action
        </td>
    </tr>
    <tr>
        <td class="first">
            &nbsp;
        </td>
        <td class="step">
            3
        </td>
        <td>
            If the library user has already reached the maximum number of simultaneous loans or has a penalty, the system informs of the situation, then this use case is cancelled.
        </td>
    </tr>
    <tr>
        <td class="first">
            References
        </td>
        <td colspan="2">
            None
        </td>
    </tr>
    <tr>
        <td class="first">
            Comments
        </td>
        <td colspan="2">
            The maximum number of simultaneous book loans and the loan period depend on the library policy and can change in the future. See business rules CRQ-003, CRQ-0014.
        </td>
    </tr>
</table>

## Experience

In my role as an architect in this company I had no power to introduce new workflows for the product managers, so the adoption of this proposed standard was voluntary. However, in general, the initiative was appreciated, and the PMs started using it, but not all wanted to play by the rules and considered the strictness as too time-consuming and even dumbed down the table. The result for those PMs was a less ambiguous and therefore less useful table.

If you don't want to use the suggested rules in this article it is perfectly fine, but it is highly recommended to have a strict set of your own rules to remove ambiguity from the process. If applied correctly and people agree and follow the rules, this format can be a great utility to communicate using cases. I would recommend you to give us case table definitions a try to see if you like them and if they improve the clarity of communication among different stakeholders.

Let me know what your thoughts are or your experience with use cases tables is in the comments.
