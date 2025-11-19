Take this article as a completely opinionated yet reasoned article about what I personally think the characteristics of a microservice are.

## What is a Microservie?

## When do you want to have Microservices?

## What is the ideal size?

There were companies who took the "micro" literally and implemented basically functions as services. Sure, you can do that, but then you'll end up with a giant network of interconnected functions that communicate via some bus or message system instead of doing direct, fast inter-process calls for almost everything. So this is obviously nonsense.

[Greg Young](https://x.com/gregyoung) once said at a conference that the ideal size of a Microservice, in his opinion, is what a full development team can do within *two* weeks. This means the team should be able to rewrite the whole service within two weeks.

I personally like this idea a lot, because this allows you to refactor the service completely within a reasonable amount of time.

There is however not a much better answer than this.
