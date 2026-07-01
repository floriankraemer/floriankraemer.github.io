---
name: technical-article-review
description: Reviews technical articles from multiple stakeholder perspectives (programmers, junior developers, business, IT/DevOps, architects). Evaluates clarity, relevance, technical depth, and value. Use when reviewing blog posts, technical drafts, markdown articles, or when the user asks for article review, technical review, or stakeholder feedback on written content.
---

# Technical Article Review

## Before You Review

1. Read the full article before writing feedback.
2. Identify the article's audience, thesis, and intended takeaway.
3. Do not edit the article unless the user explicitly asks — provide review feedback only.
4. For grammar and spelling, defer to the `grammar-spelling-check` skill unless the user wants both in one pass.

## Review Prompt

📝 Technical Article Review Prompt

Please review the following technical article and provide feedback from the perspective of your role. Focus on clarity, relevance, technical depth, and value. Use the guiding questions below for your stakeholder group.

👨‍💻 For Programmers (Mid/Senior):

    Is the code accurate, efficient, and idiomatic?

    Does it solve a real-world problem or use case you’ve encountered?

    Are there assumptions that need clarification?

    Would you apply this in production?

🧑‍🎓 For Junior Developers:

    Is the article understandable without prior deep experience?

    Were any concepts or terms unclear or unexplained?

    Did the article help you learn something new?

    Would you feel confident trying this technique after reading?

🧑‍💼 For Business Stakeholders:

    Does the article align with business goals like cost efficiency, time to market, or scalability?

    Are the benefits of the approach clearly articulated in business terms?

    Could this have strategic impact (e.g., productivity gain, faster delivery)?

    Are there risks or trade-offs that should be considered?

🧑‍💼 For IT Professionals (Operations, DevOps, Security):

    Are infrastructure, deployment, and operational concerns addressed?

    Does this approach introduce risks (e.g., security, availability, compliance)?

    Is it clear how this fits into CI/CD, monitoring, or cloud environments?

🧑‍💼 For Software Architects:

    Does the solution respect architectural principles (e.g., modularity, scalability, maintainability)?

    Are trade-offs and design decisions discussed clearly?

    Would this integrate well into complex systems or distributed architectures?

    Is it future-proof or tightly coupled to specific technologies?

General:
Please rate the article’s usefulness (1–5) and include any suggestions for improvement.

## Workflow

1. **Understand the article** — note topic, audience, structure, and main claims.
2. **Review each stakeholder lens** — answer every guiding question for that group; skip a lens only if clearly irrelevant to the article.
3. **Synthesize** — identify cross-cutting themes (strengths, gaps, risks).
4. **Rate and recommend** — assign the 1–5 usefulness score and list concrete improvements.

## Output Format

Structure feedback as:

```markdown
## Summary
[2–3 sentences: what the article covers, who it serves best, and overall assessment]

## Overall Rating
**Usefulness: X/5** — [one-sentence justification]

## 👨‍💻 Programmers (Mid/Senior)
| Question | Assessment |
|----------|------------|
| Code accurate, efficient, idiomatic? | ... |
| Real-world problem or use case? | ... |
| Assumptions needing clarification? | ... |
| Would you apply in production? | ... |

**Key feedback:** [bullets]

## 🧑‍🎓 Junior Developers
| Question | Assessment |
|----------|------------|
| Understandable without deep experience? | ... |
| Unclear concepts or terms? | ... |
| Learn something new? | ... |
| Confident trying this technique? | ... |

**Key feedback:** [bullets]

## 🧑‍💼 Business Stakeholders
| Question | Assessment |
|----------|------------|
| Aligns with business goals? | ... |
| Benefits in business terms? | ... |
| Strategic impact? | ... |
| Risks or trade-offs? | ... |

**Key feedback:** [bullets]

## 🧑‍💼 IT Professionals (Operations, DevOps, Security)
| Question | Assessment |
|----------|------------|
| Infrastructure/deployment/ops addressed? | ... |
| Security, availability, compliance risks? | ... |
| Fits CI/CD, monitoring, cloud? | ... |

**Key feedback:** [bullets]

## 🧑‍💼 Software Architects
| Question | Assessment |
|----------|------------|
| Respects architectural principles? | ... |
| Trade-offs and design decisions clear? | ... |
| Integrates into complex/distributed systems? | ... |
| Future-proof vs. technology-coupled? | ... |

**Key feedback:** [bullets]

## Suggestions for Improvement
1. [Specific, actionable suggestion]
2. ...

## Strengths
- [What works well — cite sections or passages when helpful]
```

When reviewing a file, cite locations (headings, line numbers, or quoted phrases) for specific feedback.

## Verification

Before finishing:

- [ ] Every stakeholder group was reviewed (or explicitly marked N/A with reason)
- [ ] All guiding questions were answered
- [ ] Usefulness rating (1–5) is included with justification
- [ ] Suggestions are actionable, not vague praise or criticism
- [ ] Article was not rewritten unless the user asked for edits
