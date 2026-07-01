
## Complex vs Complicated

## Inherent Complexity vs Accidental complexity

## Measuring Complexity





""
There are tools and definitions. Mark Richards mentions cyclomatic complexity in his Fundamentals of Software Architecture, Wikipedia has lots of metrics and John Ousterhout wrote a whole book about avoiding complexity at the code level.

However, as the old Parable of Two Programmers hints, all our tools measure accidental complexity. Moreover, essential (inherent) complexity depends on available technologies. When I had to interconnect SIP and DECT protocols for a VoIP gateway, I took a good open source SIP stack but had to code most of the DECT application logic by hand. SIP is inherently more complex, but to me it was simple because its complexity was hidden by the library. And if there were an open source DECT stack, the whole project would have been much simpler.

Thus, we have formulas and tools, some integrated into our IDEs, and we are gradually reducing the complexity we are exposed to by hiding it inside libraries, but there is still a leap of faith between the requirements and our code, between what business wants and what we measure.

I believe that we lack guidance, not tools.
""