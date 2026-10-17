---
layout: post
title: 'Cognitive vs. Semantic Understanding of Code'
categories: software-architecture
tags:
    - software-architecture
    - cognitive-complexity
    - code-quality
    - domain-driven-design
    - ubiquitous-language
draft: true
published: false
comments: true
---

I recently shared my [Cognitive Code Analysis Tool for PHP](https://github.com/Phauthentic/cognitive-code-analysis) on Linkedin and got a very good question in the comments: 

"Does it look at naming quality or patterns, or is that intentionally left out because it is harder to formalize than structure?"

The answer is yes, it is intentionally left out, and the reason is worth a longer explanation, because it touches the difference between the *cognitive* and the *semantic* level of understanding code.

## What the Tool Does

You may already use the cognitive score from SonarQube, but that one is calculated a little differently.
Also, the score is not the same as Cyclomatic Complexity or Halstead Complexity. Cognitive complexity measures how hard it is for a human to understand the code, while cyclomatic complexity measures how hard your code is to test.

Why does it matter? Well, understanding code is expensive and something we do most of the time.
Roughly 80% of the time is spent on reading and understanding code.
And it is also more expensive for AI agents to work with low-quality, hard-to-comprehend code!

## Why Naming Is Left Out

It is intentionally left out because it is very hard to get useful results from that approach, and it is not related at all.

Cognitive analysis is easy to do, it is easy to understand why it reported something, and it usually is good enough to find the worst code parts in an application pretty quickly. It is purely based on the idea of the limits of human cognition.

When you refer to naming quality or patterns, you get into a very different terrain.
First of all, we would have to define what "quality" means in this context.
I've experimented with a few approaches, but I never got satisfying results with trying to analyze words alone and trying to find heuristics. 

However, the goal of this is a totally different one than the one of cognitive analysis.

## "Just Flag Generic Names"

The follow-up suggestion was: if the goal is lower cognitive load, limit the number of words or the length of method names, and flag generic names like `$data`, `$tmp`, `$result` or `$manager`.
Quite deterministic and easy to explain.

Unfortunately, it is not that easy.

I would recommend everyone to peek into DDD and the concept of the ubiquitous language.
Something can have the same four letters, but a totally different meaning in another context.

The classic "User" can be something *very* different. A "Nurse" and a "Doctor" are both a "User" of a system, but with very different roles and concepts. A nurse will never perform a surgery.

The classic mistake here is to model something like `User.performSurgery()` vs. `Surgeon.performSurgery()`.
Your `Nurse` object simply does not provide this method.

You will have to infer intent, meaning and concepts from words. This is not easy even for an AI, because it needs to know the actual context of the environment.

Also, a longer method name can be better than a shorter one, if it helps to communicate the actual function and purpose of the method. Compare `setStatus()` with `deactivate()`, `reactivate()` and `activate()`.
I can use `setStatus()` and pass an enum, but the three methods describe the actual behavior through the public interface of the object and therefore make it easier to understand.

## Cognitive Limits vs. Semantics

Cognitive limits are about how much we can keep in short-term memory.
Semantics is about understanding the meaning of the words.

The best you can get from analyzing words is a distribution of words across a code base, but depending on the design of the code base you'll get deceptive results. You can have shitty code: if your 6000-line controller has all your "Order" logic inside, this looks "fine", because it's all in one place, right? Of course, this will very likely be garbage code if the controller has 6000 lines.

I've already experimented with different approaches, but IMHO there is no better way than actually talking with domain experts and doing Event Storming when you work in a really complex domain. *It is crucial to understand the problem space before writing code!*

If this understanding never made it into the code by using the idea of the ubiquitous language and well-defined boundaries, you basically have nothing to reconstruct anyway, because you're looking at a mess where words are spread everywhere and have no clear meaning.

## Conclusion

Design code for a maximum of comprehensibility on a semantic **and** cognitive level. This, by the way, will also help the AI, as shown in [this](https://codescene.com/blog/unhealthy-code-is-burning-your-token-usage-heres-the-data) paper.

I'm happy to answer all questions and criticism, or help you interpret results if you have doubts about them.
