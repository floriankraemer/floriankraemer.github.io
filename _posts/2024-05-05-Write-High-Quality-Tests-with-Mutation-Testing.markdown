---
layout: post
title: Write high quality tests with Mutation Testing
categories: software-architecture
tags:
    - software-architecture
    - testing
draft: false
published: true
comments: true
slug: write-high-quality-tests-mutation-testing
description: What is mutation testing and how does it help to improve the quality of your tests?
---

At its core, mutation testing endeavors to assess the efficacy of a test suite by simulating alterations in the codebase. These alterations, termed mutations, typically involve small, deliberate modifications to the source code, such as changing operators, swapping variable assignments, or altering conditional statements. The overarching goal is to evaluate whether the **existing tests** possess the acumen to detect and respond to these mutations effectively.

**Code coverage will show you how much code is executed, NOT how much is really checked!**

Executing the code is not enough:

* We need to check the functional behavior.
* Does a piece of code actually do what we want?
* Automated oracles can be spec, model
* Else, manual oracles have to be defined

If you think that 100% code coverage will make your tests good, then you are wrong; It says nothing about tests accuracy or use-cases completeness, and that’s why mutation testing actually matters. You can easily achieve 100% coverage but still having bad quality tests. Mutation testing will very likely improve your tests even if you have 100% coverage by discovering missed cases.

![Mutation Testing Illustration](/assets/images/illustrations/mutation-testing.png){: .align-center}

## Mutation Testing Libraries

* **PHP:** For PHP there is just one libraries available [Infection](https://github.com/infection/infection). There is also [Humbug](https://github.com/humbug/humbug) but it is discontinued and refers to Infection.
* **Java:** [PIT](https://pitest.org/) seems to be the gold standard for mutation testing in Java. [Here](https://www.baeldung.com/java-mutation-testing-with-pitest) is a short tutorial.
* **C#, JS & Scala**: [Stryker Mutator](https://stryker-mutator.io/) supports three languages.

## Benefits of Mutation Testing

In a nutshell: You test your tests for resilience and reliability to enhance the quality of your tests.

### Comprehensive Test Coverage

Mutation testing endeavors to achieve comprehensive test coverage by meticulously probing various facets of the codebase. By subjecting the code to diverse mutations, developers gain insights into areas that may be inadequately covered by existing tests, thereby facilitating the augmentation of test suites to encompass a broader spectrum of scenarios.

### Enhanced Fault Detection

By meticulously scrutinizing the test suite's response to mutations, mutation testing serves as a litmus test for the robustness of the codebase. Detected mutations highlight potential vulnerabilities and shortcomings in the code, empowering developers to fortify their codebase against latent defects and vulnerabilities.

### Facilitating Continuous Improvement

Mutation testing fosters a culture of continuous improvement by providing actionable feedback on the efficacy of test suites. Armed with insights gleaned from mutation testing, developers can iteratively refine their test cases, fortifying the codebase against potential pitfalls and enhancing its resilience in the face of evolving requirements.

## Mutation Categories

### Fist Order Mutations

First-order mutations involve **simple, localized changes** to the source code. These mutations typically include altering arithmetic operations, changing variable values, or modifying conditional statements. First-order mutations aim to simulate common programming errors or typos that developers might make.Example of first-order mutation:

```php
// Original code
return $a + $b;

// First-order mutation: Change addition to subtraction
return $a - $b;
```

In this example, the mutation involves changing the addition operation to subtraction.

**First order mutations are easy to detect and kill.**

### Higher Order Mutations

 Higher-order mutations are **more complex and involve changes that affect multiple parts** of the codebase or introduce structural modifications. These mutations aim to simulate more advanced programming mistakes or logic errors that may be harder to detect. Higher-order mutations often involve changes across different methods, classes, or even modules.Example of higher-order mutation:

---

Now, let's tackle something fancier, like a bubble sort function:

```php
function bubbleSort($arr) {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    return $arr;
}
```

Now, let's mix it up by tweaking the comparison operator:

```php
if ($arr[$j] >= $arr[$j + 1]) { // Mutation: Changed '>' to '>='
```

## Interpretation of the test results

Interpreting the results of mutation testing requires a keen eye and a discerning mindset. When analyzing the outcome of mutation testing, it's essential to pay attention to two key metrics: **mutation score** and **mutation detection rate**. The mutation score indicates the percentage of mutations that were successfully detected by the test suite, with a higher score suggesting better test coverage and robustness.

However, a high mutation score alone **may not** necessarily imply flawless testing; it's equally crucial to examine the mutation detection rate, which highlights the proportion of mutants that were correctly identified as faulty. By scrutinizing these metrics in tandem, developers can gain insights into the effectiveness of their test suite and identify areas for improvement, ultimately striving towards the creation of more resilient and dependable software applications.

Running this ```bin/infection``` will generate:

```text
Processing source code files: 1/1
.: killed, M: escaped, U: uncovered, E: fatal error, X: syntax error, T: timed out, S: skipped, I: ignored

U...M....                                            (9 / 9)

9 mutations were generated:
       7 mutants were killed
       0 mutants were configured to be ignored
       1 mutants were not covered by tests
       1 covered mutants were not detected
       0 errors were encountered
       0 syntax errors were encountered
       0 time outs were encountered
       0 mutants required more time than configured

Metrics:
         Mutation Score Indicator (MSI): 77%
         Mutation Code Coverage: 88%
         Covered Code MSI: 87%
```

Running `bin/infection --only-covered` will generate:

```text
Processing source code files: 1/1
.: killed, M: escaped, U: uncovered, E: fatal error, X: syntax error, T: timed out, S: skipped, I: ignored

...M....                                             (8 / 8)

8 mutations were generated:
       7 mutants were killed
       0 mutants were configured to be ignored
       0 mutants were not covered by tests
       1 covered mutants were not detected
       0 errors were encountered
       0 syntax errors were encountered
       0 time outs were encountered
       0 mutants required more time than configured

Metrics:
         Mutation Score Indicator (MSI): 87%
         Mutation Code Coverage: 100%
         Covered Code MSI: 87%
```

As you can clearly see, now we get a result for only the code that is already covered by unit tests. Pay especially attention to the changed MSI number. It went up to 87% from 77%.


```php
// Original code
public function add($a, $b)
{
    return $a + $b;
}

// Higher-order mutation: Change add method to subtract method
public function subtract($a, $b)
{
    return $a - $b;
}
```

In this example, the mutation involves replacing the add method with a completely different subtract method, which changes the behavior of the class significantly.

Higher-order mutations are generally more challenging for test suites to detect because they involve more substantial changes to the codebase. Detecting and effectively handling higher-order mutations is crucial for ensuring the reliability and effectiveness of mutation testing as a quality assurance technique.

## Text is cheap, code is better

Check out the example repository if you want to see it in action. You can simply clone and run the mutation tests to get the above output. [https://github.com/floriankraemer/mutation-testing-example](https://github.com/floriankraemer/mutation-testing-example)

```text
git clone git@github.com:floriankraemer/mutation-testing-example.git
composer install
bin/infection
```

## Wrapping It Up

Mutation testing is about making your test better. By challenging your tests with mutations, you can uncover weaknesses and fine-tune your test suite, ensuring your code is ready to tackle whatever comes its way. So, embrace mutation testing as your trusty sidekick in the quest for software reliability and resilience!

# References

* [The Oracle Problem in Software Testing: A Survey](https://ieeexplore.ieee.org/document/6963470)
[2] https://www.st.cs.uni-saarland.de/edu/testingdebugging10/slides/10-MutationTesting.pdf