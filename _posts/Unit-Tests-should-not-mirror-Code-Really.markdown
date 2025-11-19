I've came across a post on Linkedin in which was said to not mirror the code structure in tests.

> Unit Tests should NOT mirror code

I could agree to that if we are NOT talking about Unit Tests. But I don't think this advice can be generalized.

It is especially noteable that the post talks about Unit Tests and then switches to testing behavior and the diagram showing ... an integration test!

> A Unit Test should describe a behavior, it should be coupled to behavior rather than being coupled to code. That’s why we should avoid one-on-one mirroring of code through tests (a mistake that many developers make, creating a unit test per source code class).

If your unit tests are mirroring your source code structure - one Unit Test per class, then you're doing it wrong.

> By avoiding the mirroring, this enables you to refactor code without breaking tests.

This is definitely true if we are not talking about unit tests but integration tests.
