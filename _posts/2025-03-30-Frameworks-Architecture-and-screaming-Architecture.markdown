---
layout: post
title: 'Frameworks, Architecture & Screaming Architecture'
categories: software-architecture
tags:
  - software-architecture
date: 2025-03-30
draft: false
published: true
comments: true
---

This article explores how applications are often structured around frameworks rather than business needs and why this may not always be the best choice.

Take a look at the following directory structures. What do you see in any of the four different structures? What do you think is the purpose of the applications you're looking at?

<table>
    <tr>
        <td style="font-family: monospace;  line-height: 1.2; padding: 10px; white-space: pre; v-align: top">
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

If you haven't figured it out already, from left to right, this is the directory structure of a Laravel, Symfony, CakePHP and Yii application. But can you tell what they do?

Now let's take a look at a few different pictures of buildings.

![Church](/assets/images/illustrations/church.webp){: .align-center}

![Warehouse](/assets/images/illustrations/warehouse.webp){: .align-center}

![University](/assets/images/illustrations/university.webp){: .align-center}

![Car Repair Workshop](/assets/images/illustrations/car-repair-workshop.webp){: .align-center}

What can you see? I assume that you have very likely identified that the pictures show a church, a warehouse, some kind of educational facility and a car repair workshop.

Based on what criteria did you identify that? I guess you can tell that a church is a church based on certain characteristics that make it a church, like having a tower. A warehouse has usually this box like design with the ports for the trucks to load and unload. A car repair workshop has usually a big door where cars for repair enter and leave the building. The form follows its function and by its forms you can very easily guess its purpose. OK, there is one difference: Building architecture has also aesthetical aspects, that not necessarily follow a function. I hope your code doesn't do that.

What are you seeing in the next picture?

![Building Blocks](/assets/images/illustrations/building-blocks.webp){: .align-center}

Probably nothing specific, because you're looking at just the building blocks of a building. Is it actually for a building? If yes, what type of building?

Thats your framework, and nothing more.

Why do we step into the fallacy of building applications by throwing their building blocks into different shelves or on pallets, labelled by their type of content instead of using a system that allows us to express what the sum of its pieces is, that we've used to build something and give it a purpose. Also, a room in a building has usually a dedicated purpose.

Instead let's try to structure our applications like well-designed rooms that clearly express their intent.

## Focus on your Businesses Structure not the Framework

When building an application, you should focus on the domain, the business logic you are building and not on the framework. The framework is supposed to *support* you in building an application like the building materials, wooden and steel beams support a building, but they alone don't give the building the shape. Only in combination with other elements the building blocks become a concept as a whole. *The framework must not determine the shape of **your** application.*

As usual in architecture, it really depends on your goals: Are you building just a quick prototype? Is it mostly CRUD? Well, then it might be fine to just stick to whatever the frameworks shelves and pallets offers you.

But do you plan an application that definitely has a long life-cycle and high complexity and isn't a small project, it might not be a good idea. If you need a flexible and extendable application, then following these frameworks might not a good idea either.

How much you abstract, or better to say decouple, your applications core from the frameworks is a design decision that needs to be made based on the circumstances. I would like to stress that this depends highly on what you are building. Choose the right amount of abstraction! I personally find it very nice if I can work with simpler interfaces than the original frameworks, because I can tailor them to my real needs and often end up with something more simple and more expressive than I would get from the framework.

By decoupling the framework from your application core by using adapters, it will become easier to adapt all of the places in your application to make your changes within the frameworks that might happen. But this is a bonus and not the primary intent! You can also design more fine grained and purpose tailored interfaces that hide, complexity or things you don't need of the framework from your application. But one of the greatest benefits is that this will make your applications core, your business related code, also much more easy to test.

## Who profits from Frameworks?

Who do you think profits the most from using a framework? Is it you or the framework developers? I will go as far and argue that it helps mostly the framework developers. I explicitly want to express that the next few paragraphs are an observation and not a fact based statement. It is an observation that I've made, but it's hard to bake it by empirical data.

If you take a look at one particular, very popular framework in the PHP world (Sorry, no obvious name and shame here, make your guess!), that took it with storm, then you will realize that it is very widespread and became popular very quickly. But why is that so?

The framework's focus was very likely easy of use to make it accessible for the lesser experienced developers, to get something quickly with the framework done. So learnability and ease of use was seemingly the primary quality attribute of the design. It even made some - no only in my opinion - sub-optimal technical decisions in favor of ease of use. Given that there, most of the time, are more inexperienced people in any domain than experts, it is more or less obvious why the framework was such a success.

It's ecosystem includes both free and paid services that integrate seamlessly, making development smoother. However, this can lead to tighter coupling with the framework, which may limit flexibility in highly customized applications or long-lived projects that require flexibility.

This might be good if you have something that works fine within the constraints that every framework has. However, if you need to do something outside the framework’s intended use, and your business logic is tightly coupled to it, the framework may become more of a limitation than a tool. The framework was made easy of use, and very likely to generate revenue for its creators rather than long-term flexibility.

This does not mean you can’t build a clean, flexible, and extensible project with this framework, but achieving this often requires deviating from its default structure. This will be true for *any* framework, just more or less for some. Also do not take this section as a rant to not use frameworks as well!

## Screaming Architecture

Robert C. Martin's "Screaming Architecture" suggests that the directory structure of a project should explicitly communicate its business domain rather than technical concerns. Instead of organizing code by layers (e.g., controllers/, services/, repositories/), it should be structured around core business concepts.

<pre>
application/
│── src/
│   ├── Cart/
│   ├── Order/
│   ├── Payment/
│   ├── Checkout/
│   ├── ProductCatalog/
│   ├── LandingPage
│── config/
│── public/
│── tests/
│   ├── Cart/
│   ├── Order/
│   ├── Payment/
│   ├── Checkout/
│   ├── ProductCatalog/
│   ├── LandingPage
</pre>

This structure keeps business concerns at the forefront while maintaining separation of concerns inside each domain.

 * You instantly know that this is very likely an e-commerce application.
 * The different business concerns are clear (Orders, Payments, Cart, etc.).
 * The framework doesn’t dictate structure (Laravel, Symfony, etc., could be replaceable e.g. via Clean Architecture).

Top-level directories reflect business concerns, not technical layers. Each domain (Cart, Order, Payment, ...) has an application Layer: Use cases (commands, queries). The Domain Layer: Core domain models, entities, repositories. Infrastructure Layer: Persistence, framework-related code, external services.

This structure makes it obvious what the system does instead of focusing on technical concerns. Your domain layer should be free of any framework dependencies, ideally of any 3rd party dependencies.

It is actually nothing complex or hard to grasp. Depending on your framework you might have to initially fight with the frameworks configuration to adept it to a non-standard structure. If its hard it is in my opinion an indicator for a lack of flexibility in the framework.

## Two architectural approaches that might help you

The next section will briefly introduce you two to different approaches that could be used to help you to structure your application differently and loosen the grip of a framework on your core domains.

I may explore these approaches in more detail in future articles.

### Ports & Adapters + Clean Architecture

Clean Architecture will slice your system into four layers and the higher layers will be allowed to only talk to lower layers:

![](/assets/diagrams/Ports-and-Adapters-Layers.svg){: .align-center}

It is called ports and adapters because a “port” is anything that goes in or out of your applications core and that is your business logic. It is isolated in the domain layer. Using Inversion of Control (IoC), the domain defines repositories and other dependencies via interfaces, which are implemented by the infrastructure and used by the application layer. The presentation layer contains the adapters (e.g. HTTP or CLI) to your applications ports (Use Cases or "Services").

Clean Architecture and Ports & Adapters will help you to not only decouple the different layers from each other but also from your framework. For example sending an email could use an adapter and not the framework directly.

<pre>
application/
│── src/
│   ├── Cart/
│       ├── Application/
│       │── Domain/
│       |── Infrastructure/
│       │── Presentation/
│── config/
│── public/
│── tests/
│   ├── Cart/
│       ├── Application/
│       │── Domain/
│       |── Infrastructure/
│       │── Presentation/
</pre>

### Vertical Slices

A vertical slice is, you guessed it, a vertical slice through the layers of an application. The key here is to make sure each slice is separated or even fully separated. Compared to Clean Architecture a slice seems to be "dirty" and yes, it can be "dirty". This is of course no invitation to write the bad code but it can be less strict. What internal level of quality you aim for in a slice is up to you.

Vertical slices will organize your system by behavior/use case.

The following is one proposed structure, how exactly your slice looks like is in my opinion not that important as long as they stay isolated from each other.

<pre>
application/
└── src/
    └── Cart/
        ├── AddItem/
        │   ├── AddItemController.php
        │   ├── AddItemRequest.php
        │   ├── AddItemService.php
        │   ├── AddItemResponse.php
        │   ├── AddItemTemplate.twig.php
        │   ├── AddItemCommand.php
        |   ├── CartRepository.php
        │   ├── CartItem.php
        │   └── Cart.php
        │
        ├── RemoveItem/
        │   ├── RemoveItemController.php
        │   ├── RemoveItemRequest.php
        │   ├── RemoveItemService.php
        │   ├── RemoveItemResponse.php
        │   ├── RemoveItemTemplate.twig.php
        │   ├── RemoveItemCommand.php
        |   ├── CartRepository.php
        │   ├── CartItem.php
        │   └── Cart.php
        │
        └── Checkout/
            ├── CheckoutController.php
            ├── CheckoutRequest.php
            ├── CheckoutService.php
            ├── CheckoutResponse.php
            ├── CheckoutTemplate.twig.php
            ├── CheckoutCommand.php
            ├── CartRepository.php
            ├── CartItem.php
            └── Cart.php
</pre>

You may have noticed that there is a lot duplication between the slices. There will be very likely cases in which you need to share some logic between the cases. Maybe tax and cart calculation in our case?

But moving shared code to a central Shared/ folder introduces coupling between slices. That’s a trade-off between modularity and reuse. If the slices depend on the shared folder, the consequence is that a change to the shared folder will impact *all* slices using it.

<pre>
application/
└── src/
    └── Cart/
        ├── AddItem/
        │   ├── AddItemController.php
        │   ├── AddItemRequest.php
        │   ├── AddItemService.php
        │   ├── AddItemResponse.php
        │   ├── AddItemTemplate.twig.php
        │   ├── AddItemCommand.php
        │
        ├── RemoveItem/
        │   ├── RemoveItemController.php
        │   ├── RemoveItemRequest.php
        │   ├── RemoveItemService.php
        │   ├── RemoveItemResponse.php
        │   ├── RemoveItemTemplate.twig.php
        │   ├── RemoveItemCommand.php
        │
        ├── Checkout/
        │   ├── CheckoutController.php
        │   ├── CheckoutRequest.php
        │   ├── CheckoutService.php
        │   ├── CheckoutResponse.php
        │   ├── CheckoutTemplate.twig.php
        │   ├── CheckoutCommand.php
        │
        └── Shared/
            ├── CartRepository.php
            ├── CartItem.php
            └── Cart.php
</pre>

The primary benefit, if done properly, is that you can modify or throw away a complete vertical slice without affecting another part of the application. You could go as far as that you drop even the tests into this folder, it's up to you.

What if you have to share things? Put them "in between" two modules in a separate module or library. But this should only be limited to true coupled things. For example you want to ensure that everywhere your password must be 10 chars and at least 2 numbers and special chars, this should come from one place.

But each of your slices should implement the repositories, views, templates it needs. You **must** avoid that one change in your slice will impact another. If you fail doing so, you'll loose the advantage of them.

You get a lot freedom within a slice but you **must** adhere to high-cohesion and low coupling to be successful with it.

## Mixing Vertical Slices and Ports & Adapters

Here is a crazy idea: Group your business capabilities or features by module and decide *depending on the complexity* if you want to go for Clean Architecture or vertical slices per module. A module can become a collection of related but separate use cases, e.g. have a use case "Signup" and "PasswordReset" as module or group them underneath a module "Customers". Use vertical slices for less complex use cased and Clean Architecture for more complex and business critical functionality.

## Coupling as a trade-off

Whatever framework you are using, it really doesn't matter, but you want to be careful how much you couple yourself to the framework. In my personal experience, it becomes easier if you decouple from the framework to some extend and work with only what you need for your specific business domain instead of merging your business logic and your input and output ports tightly with the framework. **You** will be in control of these interfaces. You can control the granularity, complexity and reusability of them. Clean Architecture, the facade pattern and not merging persistence entities with domain entities helps **a lot** here. Also testing your business logic becomes more easy. I might write a follow up article on that.

As usual, I do not try to preach absolutism. I want everyone to be enabled to form their own opinion based on information and facts. I hope the article gave you a few new ideas and reasoning to try something else than you did before. It is the best if you gather your own experience and try to build an application as proposed here. Personally, I prefer working with applications that abstract the framework to some degree.

A well designed framework should not force you to couple to it a lot but instead be able to adept to your structure and to only intersect slightly with your application for the parts you really need.

## There is no magic Bullet

This article explicitly doesn't recommend any of both solutions but is thought to encourage you to think about when to use which of the different approaches and even to mix and match them as it makes sense in *your* context. You'll have to a proper analysis and judgement of your quality attributes and business goals to make a decision that will suit your context.

## Digging Deeper into the Topic

If you want to get a deeper insight into modular, decoupled applications in PHP check out Matthias Nobacks books:

* [Recipes for Decoupling](https://leanpub.com/recipes-for-decoupling/)
* [Principles of Package Design](https://www.amazon.com/Principles-Package-Design-Creating-Components/dp/1484241185)
* [Modulith for Spring](https://spring.io/projects/spring-modulith)

I would like to encourage you to try different approaches, try it at least one time but better a few times and each time a little different, gather experience. If a failure will earn you knowledge. Have fun experimenting!
