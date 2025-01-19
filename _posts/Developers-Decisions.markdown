# Developers, behavioral changes and decisions

We've had an internal training with [Emily Bache](https://emilybache.com/) that I organized, and one of the refactoring exercises sparked a very interesting discussion from a behavioral change perspective.

While I hope that the behavioral change was obvious for all attendees, I was asking myself what would happen if the developer just made the change without alignment with the product owner. We'll explore the impact of this in the article.

## Subject of the discussion

Before we get to the decision, we need to understand the context in which it needs to be made.

There is an old-fashioned input of a text file, which has a header in the first two lines, describing how many commands there are and what the initial position is. In the following example, we have two commands and an initial position of `10 22`, followed by the actual commands where to move.

```text
2
10 22
E 2
N 1
```

You can find the whole description of the coding kata [here](https://sammancoaching.org/kata_descriptions/office_cleaner.html) and the actual code [here](https://github.com/sammancoaching/OfficeCleaningRobot-Refactoring-Kata/blob/main/php/src/OfficeCleaner1/RobotCleaner.php#L62-L90). Below is just the excerpt of the code that we are discussing.

```php
foreach ($this->cleanerParser->getCommands() as $command) {
    if ($command == null) {
        continue;
    }
    $commandParts = explode(' ', $command);
    $iterations = intval($commandParts[1]);

    $move = self::$directionTable[$commandParts[0]];
    for ($count = 0; $count < $iterations; $count++) {
        $move->move($this->position);
        if (!array_key_exists($this->position->__toString(), $this->coordHashSet)) {
            $this->coordHashSet[$this->position->__toString()] = 0;
        }
    }
}
```

The suggested refactoring here was to break this into two foreach loops: one for the validation of the steps and one for the actual movement. This would make the code more readable and easier to understand, and this is true.

However, this also introduces a change in behavior. The original implementation did both things in one: parsing the commands and then moving. That means if the parsing of one line failed, your robot stops at the position where it currently is.

**Option 1**

* Iterate over the command inputs
  * Validate & perform move

**Option 2**

* Iterate over the command inputs
  * Validate command
  * Perform move

## What would you chose?

As a developer, which strategy would you choose? You should not choose it alone, because this is not a decision made by you alone.

Let's assume we have a device that needs to navigate through terrain from which it might be hard to recover or not recoverable at all. The MER rovers of NASA, for example, do [the planning and validation before they move](https://ntrs.nasa.gov/api/citations/20050157091/downloads/20050157091.pdf).

### Functional Requirements and NFRs

Because this is a behavioral change, it must be aligned with [functional requirements](https://en.wikipedia.org/wiki/Functional_requirement) and [non-functional requirements (NFRs)](https://en.wikipedia.org/wiki/Non-functional_requirement). Therefore, you really should talk to your product owner to figure out if the change is aligned with the requirements and business goals. The NFRs are described by quality attributes (QA).

If you do very large sets of moves, then splitting the parsing and moving might introduce a processing time. This impacts the user of the system (QA: responsiveness). On the other hand, the performance impact can be acceptable if there is a hard requirement to have a valid set of movements first (QA: correctness, completeness). Also, someone needs to figure out what an acceptable maximum waiting time for the validation step would be (QA: timeliness). So, there is clearly a tradeoff that needs to be made.

Consider that this is a simplified example. Moving could require further validation: In a game and real world, you might want to calculate if your device that you are moving fits on the tile or environment. Maybe your device can't drive over rocks and deep water. Besides parsing the input commands, you'll have to validate your route beforehand unless your device is smart enough to navigate around obstacles on its own. Then you don't need a detailed route, and your waypoints might be good enough.

## Conclusion

Behavioral changes should not be decided by developers alone but aligned and decided with the product owners together. A developer must be aware of what the requirements are and what the impact of the change is.

That means that product owners need to keep their developers informed and developers need to be aware of when they need to talk to their product owners - teamwork.
