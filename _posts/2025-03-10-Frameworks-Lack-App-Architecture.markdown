---
layout: post
title: 'Frameworks, Architecture & Screaming Architecture'
categories: software-architecture
tags:
  - software-architecture
date: 2025-03-10
draft: false
comments: true
---

# Frameworks, Architecture & Screaming Architecture

Take a look at the following directory structures. What do you see in any of the four different structures? What do you think is the purpose of the applications you're looking at? TEST

<table>
    <tr>
        <td style="font-family: monospace;  line-height: 1.2; padding: 10px; white-space: pre; v-align: top">
/laravel-app
├── app
│   ├── Console
│   ├── Exceptions
│   ├── Http
│   └── Providers
├── bootstrap
├── config
├── database
│   ├── factories
│   ├── migrations
│   └── seeders
├── public
├── resources
│   ├── views
│   └── lang
├── routes
├── storage
│   ├── app
│   ├── framework
│   └── logs
├── tests
└── vendor
        </td>
        <td style="font-family: monospace;  line-height: 1.2; padding: 10px; white-space: pre;     ">
/symfony-app
├── bin
├── config
├── public
├── src
│   ├── Controller
│   └── Entity
├── templates
├── tests
├── translations
├── var
└── vendor
        </td>
        <td style="font-family: monospace;  line-height: 1.2; padding: 10px; white-space: pre;     ">
/cakephp-app
├── bin
├── config
├── logs
├── plugins
├── src
│   ├── Controller
│   ├── Model
│   └── View
├── templates
├── tests
├── tmp
└── vendor
        </td>
        <td style="font-family: monospace;  line-height: 1.2; padding: 10px; white-space: pre;     ">
/yii-app
├── assets
├── commands
├── config
├── controllers
├── mail
├── models
├── runtime
├── tests
├── views
└── vendor
        </td>
    </tr>
</table>

Now let's take a look at a few different pictures of buildings.

**!!!!!add picture of raw construction materials!!!!**

So what can you see? I assume that you have clearly identified that the pictures show a church, a warehouse, some kind of educational facility and a car repair workshop.

Based on what criteria did you identify that? I guess you can tell that a church is a church based on certain characteristics that make it a church, like having a tower. A warehouse has usually.this box like design with the ports for the trucks to load and unload. A car repair workshop has usually this big door where cars for repair enter and leave the building. The form follows its function.

What are you seeing in the next picture?

**!!!!!add picture of raw construction materials!!!!**

Probably nothing specific, because you're looking at just the building blocks of a building. Thats your framework, and nothing more.

Why do we step into the fallacy of building applications by throwing their building blocks into different shelves, labelled by their type of content instead of using a system that allows us to express what the sum of its pieces is, that we've used to build something and give it a purpose.

When building an application, you should focus on the application you are building and not on the framework. The framework is supposed to support you in building an application like the building materials, wooden and steel beams support a building, but they alone don't give the building the shape. Only in combination with other elements the the building blocks become a concept as a whole.

As usual in architecture, it really depends on your goals. Are you building just a quick prototype? Is it mostly CRUD? Well, then it might be fine to just stick to whatever the framework offers you.

But do you plan an application that will be used in long term, it might not be a good idea. If you need a flexible and extendable application, then following these frameworks might not a good idea.

How much you abstract, or better to say decouple, your applications core from the frameworks is a design decision that needs to be made based on the circumstances.

By decoupling the framework from your application core by using adapters, it will become easier to adapt all of the places in your application to make your changes within the frameworks that might happen. You can also design more fine grained and purpose tailored interfaces that hide, complexity or things you don't need of the framework from your application.

Robert C. Martin's "Screaming Architecture" suggests that the directory structure of a project should explicitly communicate its business domain rather than technical concerns. Instead of organizing code by layers (e.g., controllers/, services/, repositories/), it should be structured around core business concepts.

<pre>
application/
│── src/
│   ├── Cart/
│   │   ├── Application/
│   │   ├── Domain/
│   │   ├── Infrastructure/
│   ├── Order/
│   │   ├── Application/
│   │   ├── Domain/
│   │   ├── Infrastructure/
│   ├── Payment/
│   │   ├── Application/
│   │   ├── Domain/
│   │   ├── Infrastructure/
│   ├── Checkout/
│   │   ├── Application/
│   │   ├── Domain/
│   │   ├── Infrastructure/
│   ├── ProductCatalog/
│   │   ├── Application/
│   │   ├── Domain/
│   │   ├── Infrastructure/
│── config/
│── public/
│── tests/
│   ├── Cart/
│   ├── Order/
│   ├── Payment/
│   ├── Checkout/
│   ├── ProductCatalog/
</pre>

This structure keeps business concerns at the forefront while maintaining separation of concerns inside each domain.

 * You instantly know that this is an e-commerce application.
 * The business model is clear (Orders, Payments, Cart, etc.).
 * The framework doesn’t dictate structure (Laravel, Symfony, etc., can be swapped out).

Top-level directories reflect business domains, not technical layers. Each domain (Cart, Order, Payment, ...) has an application Layer: Use cases (commands, queries). The Domain Layer: Core domain models, entities, repositories. Infrastructure Layer: Persistence, framework-related code, external services.

This structure makes it obvious what the system does instead of focusing on technical concerns. Your domain layer should be free of any framework dependencies, ideally of any 3rd party dependencies.

---

Who do you think profits the most from using a framework? Is it you or the framework developers? I will go as far and argue that it helps mostly the framework developers. I explicitly want to express that the next few paragraphs are an observation and not a fact based statement. It is an observation that I've made, but it's hard to bake it by empirical data.

If you take a look at the very popular Laravel framework in the PHP world, that took it with storm, then you will realize that it is very widespread and became popular very quickly. But why is that so?

The framework's focus was very obviously on enabling even the most junior developers to get something quickly with the framework done. So learnability and ease of use was seemingly the primary quality attribute of the design. On top of it, Tylor Otwell has built an ecosystem around the framework with paid and free services, which very much couple you tightly to the framework. Customer lock-in.

Given that there, most of the time, are more inexperienced people in any domain than experts, it is more or less obvious why the framework was such a success.

This might be good if you have something that works fine within the constraints that every framework has. But as soon as you need to do something that the framework doesn't like you to do, or doesn't allow you to easily do it, the framework, if tightly coupled to your business logic, will become a hindrance more than being a helpful tool.

Whatever framework you are using, it really doesn't matter, but you want to be careful how much you couple yourself to the framework. In my personal experience, it becomes easier if you decouple from the framework and work with only what you need for your specific business domain instead of merging your business logic and your input and output ports tightly with the framework. You will be in control of these interfaces. You can control the granularity, complexity and reusability of them. Ports and adapters, the facade pattern and not merging persistence entities with domain entities helps a lot here. I might write a follow up article on that.

As usual, I do not try to preach absolutism. I want everyone to be enabled to form their own opinion based on information and facts. I hope the article gave you a few new ideas and reasoning to try something else than you did before. It is the best if you gather your own experience and try to build an application as proposed here. At least I personally prefer to work with applications that abstract the framework to some degree away.
