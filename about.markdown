---
layout: page
title: About
permalink: /about/
---

I am a seasoned software developer and architect with a passion for shaping innovative solutions.

* I'm intrinsically motivated, I love my profession and technology.
* I like to learn new things.
* Understanding new businesses and domains is something I like, I'm curious by nature.
* DDD - Domain Driven Design. Communication and processes that ultimately manifests in great code is what I like and believe in without being dogmatic.
* I like to refactor legacy systems if I get the opportunity to do so.
* SOLID, YAGNI - Concepts that create good code.
* Artifical intelligence, neural networks - super interesting.
* Frameworks are just tools, I'm not dogmatic about them.
* While I'm proficient in PHP, I would love to work on c# and Java related projects as well.
* I'm grateful to anyone who gave and will give me chance to grow. 🙇

Let's connect and explore how my skills and knowledge can contribute to the success of your projects.

## Mentionable Projects

### Spryker: Unified Commerce - Click & Collect

Unified commerce is a business strategy that integrates all sales channels, data, and back-end systems—such as inventory management and CRM applications—into a single, seamless platform. The aim of unified commerce is to provide customers with a fully integrated and personalized shopping experience across all channels, including brick-and-mortar stores, ecommerce websites, mobile apps, social media, and more.

* Planning of the architecture for an implementation of Click & Collect in the Spryker e-commerce framework.
  * Service Points (A generic entity that can be matched to the businesses actual meaning)
  * Services (A generic, flexible expandable term, any service can be attached to a service point)
  * Different collection methods (in person, from lockers, curbside, etc...)
  * Product offers per store, collection methods and more factors

### Spryker: Unified Commerce - Fulfillment Process

The order fulfillment process typically involves receiving goods, short-term storage in a warehouse in the distribution center, customer order processing (picking and packaging) and shipping and logistics.

* Planning of the architecture for a multi-step warehouse process
  * Abstract of warehouse selection strategies based on the orders
  * Abstraction for picking strategies
  * Management of bin Locations, trollies, and boxes
  * Picking items, packing items, shipping items
  * Management of different types of storage areas
    * Managing access to those areas

### Spryker: Abstract Authentication & Authorziation

* Planning the architecture of an abstract authentication and authorization implementation
  * Useable in all layers of Sprykers architecture: Storefront, Backoffice, Glue/SAPI/BAPI.
  * Extendible, abstract, flexible

### PSA Publishers: World Architects

* Foundational refactoring of a very bad code base delivery by an offshore company
* Introduction of a proper Git-Workflow
* Introduction of a proper CI/CD process
* Upgrading to CakePHP 3
* Expanding the product with additional features
* Performance improvements via
  * Redis Cache
  * Eventual Consistency
  * A view model based on Elastic Search
* Implementation of e-commerce features
* Planning microservices to seperate some, but not all features from the monolith
* Planning a CRM system

World Architects codebase was originall done very poorly by an off-shore company. The first step was to refactor the code to comply with the CakePHP frameworks standards and to remove any hacks that were made to the core libraries.

When I took over the codebase there was no CI/CD process present and CI/CI was introduced by using Travis CI and Scrutinizer CI.

The code base was also migrated to CakePHP 3 and cleaned up.

### CakePHP: Core Contributor

I've been a CakePHP core contributor from 2007 to 2016.

#### Authorization & Authentication refactor

The authentication and authorization of the framework was extracted into extensions or plugins of the framework and completely refactored by me.

#### Why did I stop?

I stopped contributing to CakePHP because at the time the frameworks development slowed down and did not align well with the way the software at my company was developed. The decision at this time was made to go with a framework less approach and to isolate the domain logic better from the framework. However, it looks like that CakePHP 5 today catched up and addressed a few of the reasons.

### Engin-Heinisch: Spindeldoctor

The task here was to build a complete new application that tracks the repair process of a motor-spindle and provides the customer with a documentation of the repair process. All steps done during the repair process were documented with photos.

* Requirement gathering.
* Implementation of the whole application.
  * Repair process worfklow.
  * Repair report generation.
