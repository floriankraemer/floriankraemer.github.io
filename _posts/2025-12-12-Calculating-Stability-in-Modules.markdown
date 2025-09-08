---
layout: post
title: '(De)coupling Modules and Stability'
categories: software-architecture
tags: 
    - software-architecture
    - decoupling
    - coupling
draft: true
published: false
comments: true
date: 2025-04-30
---

This article provides insight into different ways of coupling and decoupling modules in a modular system. Depending on your context, a module can be either an isolated component within a monolithic system or a distributed component that communicates over a network. This distinction already impacts the options available for designing your modules.

In this context, instability means that a module depending heavily on other components is more likely to be affected by changes in those components. This increases the probability of defects propagating into the dependent module, making it more fragile and harder to maintain.

## Stability Calculation

To get an idea about the stability of our connections between the modules we can calculate the stability. But how can we calculate the stability of a dependency?

The formula to calculate the **Instability** (I) of a class or module comes from **Robert C. Martin's software metrics** (also known as package metrics), particularly from his work on **Stable Dependencies Principle (SDP)**. This calculation was originally thought to be used on class level but can very well be applied to anything that has dependencies.

> **I = E / (A + E)**

* **I**: Instability (ranges from 0 to 1)
* **A**: Afferent Couplings — number of classes outside the module that depend on classes inside the module (incoming dependencies)
* **E**: Efferent Couplings — number of classes inside the module that depend on classes outside the module (outgoing dependencies)

Interpretation:

* I = 0 → Completely stable (many depend on it, but it depends on nothing)
* I = 1 → Completely unstable (depends on many, but nothing depends on it)

### Tools for Stability Calculations

To calculate afferent and efferent couplings, you can use static analysis tools like JDepend (for Java), SonarQube, [NDepend](https://www.ndepend.com/) (for .NET) or [PHP Depend](https://pdepend.org/) for PHP. These tools analyze your codebase to generate dependency graphs and calculate metrics like Instability (I). For custom setups, you can write scripts to parse import statements or dependency configurations (e.g., in Maven, Gradle, or npm) to quantify couplings. Visualizing these metrics in a dependency graph can help identify overly unstable modules.

### Limits & Caveats of this Calculation

As usual, keep in mind that this metric is just one indicator, but in my opinion a good one that is easy to measure. You need to keep also the logical coupling in mind and not only the technical coupling via dependencies.

When you add logic, checks for "types", to the recommendation module, you'll add knowledge and complexity to it as well. Once your module has to deal with 20 additional items, you'll have basically 20 checks or the need to implement the strategy pattern to deal with all of the different types, increasing the internal complexity of the Recommendations module. It will become more instable in this case and also logically coupled to other domains.

## Logical Coupling

Logical coupling occurs when a module embeds knowledge about other domains, such as type-specific checks in the Recommendations module. To detect it, conduct code reviews focusing on domain boundaries or use tools to analyze co-changed files in version control (e.g., Git). To mitigate logical coupling, consider Domain-Driven Design (DDD) practices like defining clear Bounded Contexts or using Domain Events. For example, instead of the Recommendations module checking for "Event" or "Horse" types, it could subscribe to events like EventCreated or HorseRegistered, keeping it agnostic to entity specifics.

## Example Scenario

We have a "Recommendations" module, that is a low-level, or kind of infrastructure like module as it provides a very abstract implementation of recommendations. It should therefore have no knowledge about other functionality. No knowledge (or code) about other entities should leak into it.

The goal here is to display personalized recommendations on the landing page for different entities. For the reason of keeping this simple, the entities are limited to "Events" and "Horses", but you could imagine additional entities here as well, e.g. "Videos", "Riders", "Auctions", to increase the number of dependencies.

But there is a caveat: The architecture is, for the time being, a modular monolith. But keep in mind that we are able to break it into multiple deployment units or (micro)services and are able to extract modules from it into new, smaller services, that could be deployed independently. If this is a desired design goal, then you'll have to consider that when designing your modules, because not every solution will allow you to make easily and performant network calls.

## Directly Coupling Modules

The recommendations module will make direct calls to any other module that it needs to do something, e.g. enriching the recommendations with data from another module / context. This will of course lead to a avery tight coupling on a technical and conceptual level.

![Direct Coupling Diagram](/assets/diagrams/modules-direct-coupling.svg)

Pros

* Simple hierarchy.
* Small number of modules.

Cons

* Recommendations becomes a very unstable module the more module dependencies you add.
* Recommendations becomes aware of a lot different concepts.
* Direct coupling.
* Can't be easily split into different applications / code bases because of the tight  and direct coupling.

## Plugin / Extension per Module

In this solution there is a "Contract" module, that provides just interfaces for the Recommendations module. Nothing else is allowed to be inside.

The recommendations module will get the implementations of the "plugins" provided through dependency injection as a collection of one or multiple different plugins, that can extend core functionality of the Recommendation module.

![Extensions per Module Diagram](/assets/diagrams/modules-extensions.svg)

Pros

* Simple hierarchy.
* Decoupled extension by inversion of control.

Cons

* Recommendations can't be extracted into a separate deployment unit / service without taking all the dependent modules with it! That means you can't extract it and build a "microservice" from it because it is very likely a shared DB required and other things because the plugins might have further dependencies.

### Code Example

```java
import java.util.List;
import java.util.ArrayList;

// Interface for Recommendation Plugins
interface RecommendationPlugin {
    EnrichedRecommendation enrichRecommendation(Recommendation data);
}

// Core Recommendation class
class Recommendation {
    // Placeholder for recommendation data
    private String id;

    public Recommendation(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}

// Enriched Recommendation class
class EnrichedRecommendation {
    private Recommendation baseRecommendation;
    private Object additionalData;

    public EnrichedRecommendation(Recommendation baseRecommendation, Object additionalData) {
        this.baseRecommendation = baseRecommendation;
        this.additionalData = additionalData;
    }
}

// Recommendations Module
class RecommendationsModule {
    private List<RecommendationPlugin> plugins;

    public RecommendationsModule(List<RecommendationPlugin> plugins) {
        this.plugins = plugins;
    }

    public List<EnrichedRecommendation> generateRecommendations() {
        List<Recommendation> recommendations = fetchBaseRecommendations();
        List<EnrichedRecommendation> enriched = new ArrayList<>();
        for (RecommendationPlugin plugin : plugins) {
            for (Recommendation rec : recommendations) {
                enriched.add(plugin.enrichRecommendation(rec));
            }
        }
        return enriched;
    }

    private List<Recommendation> fetchBaseRecommendations() {
        // Core logic for generating recommendations
        List<Recommendation> recommendations = new ArrayList<>();
        recommendations.add(new Recommendation("rec1"));
        recommendations.add(new Recommendation("rec2"));
        return recommendations;
    }
}

// Example Plugin for Events
class EventRecommendationPlugin implements RecommendationPlugin {
    @Override
    public EnrichedRecommendation enrichRecommendation(Recommendation data) {
        // Fetch event-specific data and enrich recommendation
        return new EnrichedRecommendation(data, new Object() /* Event-specific data */);
    }
}
```

## One Connector Module per Type

This solution will place one module per recommendable entity in between the recommendations and component using them. This decouples the actual recommendations from having knowledge about any of the types.

![One Connector Module per Type Diagram](/assets/diagrams/modules-one-per-type.svg)

Pros

* Recommendations stays very decoupled and low level.

Cons

* Fetching mixed types might become tricky or at least requires multiple calls to multiple modules.

## One Connector Module

This is similar to directly coupling but a little bit better: Instead of making the recommendations module aware of additional things it should not know, we place a connector module in between. That connector module will have dependencies to modules of all of the entity types it needs. In this case your connector module will become an instable module.

![One Connector Module Diagram](/assets/diagrams/modules-one-connector.svg)

Pros

* Recommendations stays very decoupled and low level.
* Simple hierarchy.
* Small number of modules.

Cons

* The expander module becomes a "god" module, that needs to know ALL other types. Which also prevents us from separating.

## Comparison

| Pattern                     | Stability (I) | Monolith Suitability | Microservices Suitability | Complexity | Key Trade-off                        |
| --------------------------- | ------------- | -------------------- | ------------------------- | ---------- | ------------------------------------ |
| Direct Coupling             | High (~1)     | Poor                 | Poor                      | Low        | Fragile, hard to extract             |
| Plugin/Extension per Module | Low (~0)      | High                 | Moderate                  | Medium     | Extensible but tied to monolith      |
| One Connector per Type      | Low (~0)      | Moderate             | High                      | High       | Scalable but complex for mixed types |
| One Connector Module        | Moderate      | Moderate             | Poor                      | Medium     | Creates a "god" module               |

## Conclusions

The Anti-Patterns: Direct Coupling and the single One Connector Module should generally be avoided. Direct Coupling makes the core module fragile and impossible to extract. The single Connector merely moves the problem, creating a new "god module" that becomes a bottleneck for development and deployment, defeating the purpose of modularity.

The Viable Solutions: The most effective patterns presented were the Plugin/Extension per Module and the One Connector Module per Type. Both successfully apply the Dependency Inversion Principle, ensuring the Recommendations module remains stable (I ≈ 0) and unaware of the specific entities it serves.

The decision between these two robust patterns depends on your architectural goals:

Choose the Plugin/Extension pattern for a modular monolith where you need extensibility without the immediate need for separate deployment. It's a clean, simple, and powerful pattern that leverages dependency injection effectively within a single codebase.

Choose the One Connector Module per Type pattern if future extraction into microservices is a primary design goal. Each connector acts as a clear seam and potential Anti-Corruption Layer for a future service boundary. This pattern makes the eventual migration significantly easier by pre-organizing the dependencies for independent deployment, even if it adds more modules initially.

By calculating and considering module stability, we can make conscious design choices that prevent architectural decay. We build systems that are not only functional today but are also prepared for the inevitable changes of tomorrow.

