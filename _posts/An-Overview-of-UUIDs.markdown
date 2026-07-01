---
layout: post
title: The differences of UUIDs
categories: software-architecture
tags: software-architecture
---

Did you know that there are many versions of the UUID? Have you ever bothered to check them out and what their differences are? This article tries to shed some light on them and their different use cases.


There are 8 versions of UUIDs:

1. **Version 1 - Time-based**
   - **Description:** Based on timestamp and MAC address.
   - **Use Case Example:** Distributed Systems - In a microservices architecture, UUID v1 can be used to generate unique identifiers for each request or transaction. The time-based component ensures that the IDs are unique and sortable, which helps in logging and tracing requests across different services.

2. **Version 2 - DCE Security**
   - **Description:** Similar to v1, but with additional security features.
   - **Use Case Example:** Legacy Systems - Some older systems still in operation, especially those using DCE (Distributed Computing Environment), may use UUID v2 for compatibility and additional security features like embedding POSIX UIDs.

3. **Version 3 - Name-based (MD5)**
   - **Description:** Generated from a namespace and name using MD5 hash.
   - **Use Case Example:** Content Addressing - In a content delivery network (CDN), UUID v3 can be used to generate reproducible and consistent identifiers for resources (like images or videos) based on their URLs. This ensures that the same URL always maps to the same UUID, useful for caching and retrieval.

4. **Version 4 - Random**
   - **Description:** Generated using random or pseudo-random numbers.
   - **Use Case Example:** General Purpose - In a web application, UUID v4 can be used to generate unique identifiers for user sessions, ensuring that each session has a unique ID without any dependency on external factors like timestamps or network addresses.

5. **Version 5 - Name-based (SHA-1)**
   - **Description:** Generated from a namespace and name using SHA-1 hash.
   - **Use Case Example:** Reproducible IDs - In a configuration management system, UUID v5 can be used to generate unique and reproducible identifiers for configuration items based on their names and namespaces, ensuring consistency across deployments.

6. **Version 6 - Reordered Time-based**
   - **Description:** Based on timestamp, with improved sorting.
   - **Use Case Example:** Databases - In a high-traffic database, UUID v6 can be used for primary keys. The reordered time component ensures that the keys are generated in a sortable manner, improving the performance of indexed queries.

7. **Version 7 - Time-ordered**
   - **Description:** Based on Unix timestamp in milliseconds.
   - **Use Case Example:** Time-sensitive Applications - In a financial trading application, UUID v7 can be used to uniquely identify trades or transactions. The time-ordered nature helps in maintaining the sequence and quickly accessing recent trades.

8. **Version 8 - Custom**
   - **Description:** User-defined, with custom encoding.
   - **Use Case Example:** Experimental Features - In a research project exploring new ways to encode and compress large datasets, UUID v8 can be customized to include specific data patterns or information relevant to the experiment, allowing for tailored identification schemes.

## Comparison Table

Use this table to figure out which one might be the best for your use case. But don't rely blindly on it, analyze your case and pick the right one.

| Version | Name | Description | Structure | Uniqueness | Use Cases |
|---------|------|-------------|-----------|------------|-----------|
| 1 | Time-based | Based on timestamp and MAC address | Time-low-Time-mid-Time-high-and-version-Clock-sequence-Node | Globally unique | Distributed systems, logging |
| 2 | DCE Security | Similar to v1, but with security features | Time-low-Time-mid-Time-high-and-version-DCE-security-Node | Globally unique | Legacy systems, rarely used |
| 3 | Name-based (MD5) | Generated from a namespace and name using MD5 hash | MD5 hash of namespace and name | Unique within namespace | Content addressing, reproducible IDs |
| 4 | Random | Generated using random or pseudo-random numbers | Random bits | Statistically unique | General purpose, default in many systems |
| 5 | Name-based (SHA-1) | Generated from a namespace and name using SHA-1 hash | SHA-1 hash of namespace and name | Unique within namespace | Content addressing, reproducible IDs |
| 6 | Reordered time-based | Based on timestamp, with improved sorting | Time (in milliseconds)-Clock-sequence-Node | Globally unique, sortable | Time-ordered operations, databases |
| 7 | Time-ordered | Based on Unix timestamp in milliseconds | Unix timestamp-Random | Globally unique, sortable | Time-sensitive applications, databases |
| 8 | Custom | User-defined, with custom encoding | Variable, defined by implementer | Depends on implementation | Special use cases, experimental |

## Attribute Comparison Table

| UUID Version | Uniqueness | Randomness | Sortability | Predictability | Security | Performance | Simplicity |
|--------------|------------|------------|-------------|----------------|----------|-------------|------------|
| 1 (Time-based) | High | Low | Moderate | Moderate | Low | High | Moderate |
| 2 (DCE Security) | High | Low | Moderate | Low | Moderate | Moderate | Low |
| 3 (Name-based MD5) | Moderate | Low | Low | High | Low | High | High |
| 4 (Random) | High | High | Low | Low | Moderate | High | High |
| 5 (Name-based SHA-1) | Moderate | Low | Low | High | Moderate | High | High |
| 6 (Reordered time-based) | High | Low | High | Moderate | Low | High | Moderate |
| 7 (Time-ordered) | High | Moderate | High | Moderate | Low | High | High |
| 8 (Custom) | Varies | Varies | Varies | Varies | Varies | Varies | Low |