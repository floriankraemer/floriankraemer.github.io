---
layout: post
title: The differences of UUIds
categories: software-architecture
tags: software-architecture
---



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



---

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