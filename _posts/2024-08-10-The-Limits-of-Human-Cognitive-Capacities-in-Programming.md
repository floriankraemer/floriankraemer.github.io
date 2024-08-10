---
layout: post
title: 'The Limits of Human Cognitive Capacities in Programming and Their Impact on Code Readability'
categories: software-architecture
tags:
  - software-architecture
date: 2024-07-25T21:15:00.000Z
draft: false
published: true
comments: true
---

## Introduction

Programming is both a technical and cognitive task. While technical skills and knowledge are essential, cognitive abilities play a critical role in how effectively a developer can write, read, and understand code. Understanding the limits of human cognitive capacities can help software architects and developers design code that is more readable, maintainable, and less error-prone.

## The Cognitive Load in Programming

Cognitive load refers to the mental effort required to process information. In programming, cognitive load is influenced by factors like code complexity, the number of concepts a developer must keep in mind, and how well these concepts are organized. Human cognitive capacity, particularly working memory, is finite, typically handling around 4 to 7 discrete items at a time. This limitation is crucial in programming, where maintaining a mental model of code structure, logic flow, and variables is necessary.

## Impact on Code Readability and Understandability

Complex code structures, such as deeply nested loops or convoluted logic, exceed the typical capacity of working memory. When developers cannot easily grasp the entirety of a code block, they are more prone to errors and misunderstandings. This underscores the importance of breaking down complex functions into smaller, manageable units.

* **Naming Conventions:** The cognitive load is also affected by how variables, functions, and classes are named. Poorly named entities increase the mental effort required to understand their purpose, making the code harder to follow. Adopting clear, descriptive names reduces unnecessary cognitive strain.
* **Chunking and Modularity:** Chunking is a cognitive strategy where individuals group information into larger, more manageable units. In programming, this is analogous to modular design—breaking down a system into discrete, self-contained modules. This approach aligns with the brain’s natural tendency to chunk information, making the code easier to understand and maintain.
* **Consistent Patterns:** Human brains are wired to recognize patterns. Consistent coding patterns and styles reduce the cognitive load because developers can predict how code is likely to behave. Inconsistent coding styles force developers to expend more cognitive resources to understand the deviations.

## Measuring Cognitive Load in Code

Measuring the cognitive load imposed by code is challenging but possible. Metrics like cyclomatic complexity (which measures the number of linearly independent paths through a program's source code) provide a proxy for cognitive complexity. Tools like Halstead complexity measures also give insights into the mental effort required to read and understand code. These metrics can guide developers in refactoring code to be more comprehensible.

## My PHP Cognitive Code Analysis Tool

Base on this I've written a cognitive code analyzer: [Cognitive Code Analysis](https://github.com/Phauthentic/cognitive-code-analysis).  It gathers these metrics and calculates a cognitive score from it.

* Line Count
* Method Argument Count
* Return Statement Count
* Variable Count
* Property Call Count
* If Count
* If Nesting Level
* Else Count

### Score Calculation

A score is calculated that increases logarithmically as the input value exceeds a specified threshold. The result is 0 when the value is less than or equal to the threshold. When the value is greater than the threshold, the weight is calculated using a logarithmic function that controls the rate of increase.

Given a value of 75 that is greater than the threshold of 50, the function calculates the logarithmic weight as `log(1 + (75 - 50) / 10, M_E)` which results in approximately 2.302585.

### Result Interpretation

Interpreting the results of code complexity metrics like cognitive complexity, cyclomatic complexity, and other traditional measures requires understanding what each metric tells you about the code and how to use that information effectively.

Also consider that something that you perceive as easy or understandable might not be the same for someone else.

### Examples

### Wordpress WP_Debug_Data

```txt
Class: \WP_Debug_Data
┌───────────────────┬──────────────┬─────────────┬───────────┬─────────────┬─────────────────────┬────────────┬──────────────────┬────────────┬──────────────────────┐
│ Method Name       │ # Lines      │ # Arguments │ # Returns │ # Variables │ # Property Accesses │ # If       │ If Nesting Level │ # Else     │ Cognitive Complexity │
├───────────────────┼──────────────┼─────────────┼───────────┼─────────────┼─────────────────────┼────────────┼──────────────────┼────────────┼──────────────────────┤
│ check_for_updates │ 5 (0)        │ 0 (0)       │ 0 (0)     │ 0 (0)       │ 0 (0)               │ 0 (0)      │ 0 (0)            │ 0 (0)      │ 0                    │
│ debug_data        │ 1261 (6.399) │ 0 (0)       │ 1 (0)     │ 105 (3.073) │ 20 (1.03)           │ 58 (4.025) │ 3 (1.099)        │ 33 (3.497) │ 19.122               │
│ get_wp_constants  │ 143 (3.75)   │ 0 (0)       │ 1 (0)     │ 9 (0.875)   │ 0 (0)               │ 5 (1.099)  │ 1 (0)            │ 5 (1.609)  │ 7.333                │
│ get_wp_filesystem │ 59 (0)       │ 0 (0)       │ 1 (0)     │ 9 (0.875)   │ 0 (0)               │ 1 (0)      │ 1 (0)            │ 0 (0)      │ 0.875                │
│ get_mysql_var     │ 14 (0)       │ 1 (0)       │ 2 (0)     │ 2 (0)       │ 0 (0)               │ 1 (0)      │ 1 (0)            │ 0 (0)      │ 0                    │
│ format            │ 59 (0)       │ 2 (0)       │ 1 (0)     │ 11 (1.03)   │ 0 (0)               │ 5 (1.099)  │ 1 (0)            │ 5 (1.609)  │ 3.738                │
│ get_database_size │ 13 (0)       │ 0 (0)       │ 1 (0)     │ 4 (0.336)   │ 1 (0)               │ 1 (0)      │ 1 (0)            │ 0 (0)      │ 0.336                │
│ get_sizes         │ 124 (3.497)  │ 0 (0)       │ 1 (0)     │ 14 (1.224)  │ 0 (0)               │ 9 (1.946)  │ 2 (0.693)        │ 5 (1.609)  │ 8.969                │
└───────────────────┴──────────────┴─────────────┴───────────┴─────────────┴─────────────────────┴────────────┴──────────────────┴────────────┴──────────────────────┘
```

### Doctrine Paginator

```txt
Class: Doctrine\ORM\Tools\Pagination\Paginator
┌───────────────────────────────────────────┬─────────┬─────────────┬───────────┬─────────────┬─────────────────────┬───────┬──────────────────┬───────────┬──────────────────────┐
│ Method Name                               │ # Lines │ # Arguments │ # Returns │ # Variables │ # Property Accesses │ # If  │ If Nesting Level │ # Else    │ Cognitive Complexity │
├───────────────────────────────────────────┼─────────┼─────────────┼───────────┼─────────────┼─────────────────────┼───────┼──────────────────┼───────────┼──────────────────────┤
│ __construct                               │ 10 (0)  │ 2 (0)       │ 0 (0)     │ 1 (0)       │ 1 (0)               │ 1 (0) │ 1 (0)            │ 0 (0)     │ 0                    │
│ getQuery                                  │ 4 (0)   │ 0 (0)       │ 1 (0)     │ 1 (0)       │ 1 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0                    │
│ getFetchJoinCollection                    │ 4 (0)   │ 0 (0)       │ 1 (0)     │ 1 (0)       │ 1 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0                    │
│ getUseOutputWalkers                       │ 4 (0)   │ 0 (0)       │ 1 (0)     │ 1 (0)       │ 1 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0                    │
│ setUseOutputWalkers                       │ 6 (0)   │ 1 (0)       │ 1 (0)     │ 1 (0)       │ 1 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0                    │
│ count                                     │ 12 (0)  │ 0 (0)       │ 1 (0)     │ 1 (0)       │ 1 (0)               │ 1 (0) │ 1 (0)            │ 0 (0)     │ 0                    │
│ getIterator                               │ 46 (0)  │ 0 (0)       │ 2 (0)     │ 9 (0.875)   │ 2 (0)               │ 3 (0) │ 2 (0.693)        │ 2 (0.693) │ 2.262                │
│ cloneQuery                                │ 13 (0)  │ 1 (0)       │ 1 (0)     │ 3 (0.182)   │ 0 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0.182                │
│ useOutputWalker                           │ 8 (0)   │ 1 (0)       │ 2 (0)     │ 1 (0)       │ 1 (0)               │ 1 (0) │ 1 (0)            │ 0 (0)     │ 0                    │
│ appendTreeWalker                          │ 11 (0)  │ 2 (0)       │ 0 (0)     │ 1 (0)       │ 0 (0)               │ 1 (0) │ 1 (0)            │ 0 (0)     │ 0                    │
│ getCountQuery                             │ 25 (0)  │ 0 (0)       │ 1 (0)     │ 4 (0.336)   │ 1 (0)               │ 2 (0) │ 1 (0)            │ 1 (0)     │ 0.336                │
│ unbindUnusedQueryParams                   │ 17 (0)  │ 1 (0)       │ 0 (0)     │ 6 (0.588)   │ 0 (0)               │ 1 (0) │ 1 (0)            │ 0 (0)     │ 0.588                │
│ convertWhereInIdentifiersToDatabaseValues │ 11 (0)  │ 1 (0)       │ 1 (0)     │ 5 (0.47)    │ 1 (0)               │ 0 (0) │ 0 (0)            │ 0 (0)     │ 0.47                 │
└───────────────────────────────────────────┴─────────┴─────────────┴───────────┴─────────────┴─────────────────────┴───────┴──────────────────┴───────────┴──────────────────────┘
```

## Conclusion

The limits of human cognitive capacities are a significant consideration in programming, impacting code readability and understandability. By acknowledging these limits and employing strategies to mitigate cognitive load, developers can produce code that is not only easier to work with but also more robust and less prone to errors. Measuring cognitive load through complexity metrics and utilizing cognitive science principles can lead to better software design and ultimately, more efficient development processes.

## Papers & Studies

If you are interested, these pages and papers provide more information on cognitive limitations and readability and the impact on the business.

* [Cognitive Complexity Wikipedia](https://en.wikipedia.org/wiki/Cognitive_complexity)
* [Cognitive Complexity and Its Effect on the Code](https://www.baeldung.com/java-cognitive-complexity) by Emanuel Trandafir.
* [Human Cognitive Limitations. Broad, Consistent, Clinical Application of Physiological Principles Will Require Decision Support](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5822395/) by Alan H. Morris.
* [The Magical Number 4 in Short-Term Memory: A Reconsideration of Mental Storage Capacity](https://www.researchgate.net/publication/11830840_The_Magical_Number_4_in_Short-Term_Memory_A_Reconsideration_of_Mental_Storage_Capacity) by Nelson Cowan
* [Neural substrates of cognitive capacity limitations](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3131328/) by Timothy J. Buschman,a,1 Markus Siegel,a,b Jefferson E. Roy,a and Earl K. Millera.
* [Code Readability Testing, an Empirical Study](https://www.researchgate.net/publication/299412540_Code_Readability_Testing_an_Empirical_Study) by Todd Sedano.