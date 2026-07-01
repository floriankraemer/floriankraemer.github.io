---
name: grammar-spelling-check
description: Reviews text for grammar and spelling errors while preserving the author's voice, tone, and word choice. Applies Chicago headline-style capitalization to headings. Use when proofreading, copy-editing, lectoring, reviewing blog posts, markdown drafts, or when the user asks for grammar, spelling, or style-preserving corrections.
---

# Grammar and Spelling Check

## Before You Edit

Read `.cursor/rules/writing-style.mdc` and follow it strictly.

## Core Principles

1. **Fix only what is wrong** — correct grammar and spelling errors; do not rewrite for preference.
2. **Preserve voice** — keep tone, sentence structure, phrasing, and word choice unless grammatically incorrect or misspelled.
3. **Do not add or remove text** without asking the user first.
4. **Headings** — apply Chicago headline-style capitalization (see writing-style rule).

## Workflow

1. Read the full text before suggesting changes.
2. Identify grammar and spelling issues only — not stylistic preferences.
3. For each issue, note:
   - **Location** (line, paragraph, or heading)
   - **Problem** (what is grammatically or orthographically wrong)
   - **Suggested fix** (minimal change that preserves the author's expression)
4. Flag ambiguous cases separately — ask rather than assume.
5. Review headings against Chicago rules; suggest capitalization fixes only.

## What to Correct

- Spelling and typos
- Subject–verb agreement, tense consistency, pronoun reference
- Missing or misplaced punctuation that changes meaning or breaks grammar
- Article and preposition errors that are clearly wrong (not debatable style)
- Heading capitalization per Chicago style

## What Not to Change

- Deliberate stylistic choices (fragments, informal tone, rhetorical repetition)
- Synonyms that are grammatically valid but "sound better" to you
- Sentence length or structure when grammar is correct
- Technical terms, proper nouns, or coined phrases unless clearly misspelled
- Content additions, deletions, or reorganization — ask first

## Output Format

Structure feedback as:

```markdown
## Summary
[One or two sentences: overall quality and scope of issues found]

## Corrections
| Location | Issue | Suggested fix |
|----------|-------|---------------|
| ... | ... | ... |

## Headings (if any)
| Heading | Issue | Suggested fix |
|---------|-------|---------------|

## Advice
[Optional brief notes on clarity or structure — suggestions only, not rewrites]

## Questions
[Ambiguous cases where you need the user's intent before changing text]
```

When applying edits directly to a file, make the smallest diff possible and list every change in the summary.

## Verification

Before finishing:

- [ ] Every change fixes a real grammar or spelling error (or heading capitalization)
- [ ] No tone, phrasing, or word choice was altered for preference
- [ ] No text was added or removed without explicit user approval
- [ ] Headings follow Chicago style where applicable
