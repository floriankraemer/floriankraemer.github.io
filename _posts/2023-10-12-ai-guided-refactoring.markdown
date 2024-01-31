---
layout: post
title:  "AI Guided Code Refactoring"
date:   2023-10-12 21:12:01 +0000
categories: software-development
tags: software-development ai chatgpt
---

## Introduction

With the rise of AI tools, especially ChatGTP it has become an interesting topic how and if AI can be used to write or refactor code. Here is a little experiment on how well ChatGPT can refactor code to make it easier to understand and therefore to maintain and reduce the cost.

## Initializing ChatGPT

Usually you initialize a ChatGPT conversation with a prompt that sets some constraints and information for it.

ChatGPT was initialized with this simple prompt:

```text
I want you to act as PHP expert.
- Follow the SOLID principles.
- Write human readable and comprehensible code
- Give SHORT answers
- Always provide a COMPLETE code refactoring when asked
- Never skip code when answering
```

## Refactoring the Code

I've picked a more or less random method `describeContainerServices()` from the Symfony framework that had a high cyclomatic complexity, the [TextDescriptor](https://github.com/symfony/symfony/blob/7.1/src/Symfony/Bundle/FrameworkBundle/Console/Descriptor/TextDescriptor.php) from the Console bundle.

The following was given as a prompt:

```text
👱 Refactor this method into a better to understand structure for humans. Extract smaller methods from it with none of them having more than a maximum of 5 different variables at a time if possible. Keep the original methods name and refer in it to the extracted methods.
```

```php
protected function describeContainerServices(ContainerBuilder $container, array $options = []): void
{
    $showHidden = isset($options['show_hidden']) && $options['show_hidden'];
    $showTag = $options['tag'] ?? null;

    if ($showHidden) {
        $title = 'Symfony Container Hidden Services';
    } else {
        $title = 'Symfony Container Services';
    }

    if ($showTag) {
        $title .= sprintf(' Tagged with "%s" Tag', $options['tag']);
    }

    $options['output']->title($title);

    $serviceIds = isset($options['tag']) && $options['tag']
        ? $this->sortTaggedServicesByPriority($container->findTaggedServiceIds($options['tag']))
        : $this->sortServiceIds($container->getServiceIds());
    $maxTags = [];

    if (isset($options['filter'])) {
        $serviceIds = array_filter($serviceIds, $options['filter']);
    }

    foreach ($serviceIds as $key => $serviceId) {
        $definition = $this->resolveServiceDefinition($container, $serviceId);

        // filter out hidden services unless shown explicitly
        if ($showHidden xor '.' === ($serviceId[0] ?? null)) {
            unset($serviceIds[$key]);
            continue;
        }

        if ($definition instanceof Definition) {
            if ($definition->hasTag('container.excluded')) {
                unset($serviceIds[$key]);
                continue;
            }
            if ($showTag) {
                $tags = $definition->getTag($showTag);
                foreach ($tags as $tag) {
                    foreach ($tag as $key => $value) {
                        if (!isset($maxTags[$key])) {
                            $maxTags[$key] = \strlen($key);
                        }
                        if (\is_array($value)) {
                            $value = $this->formatParameter($value);
                        }

                        if (\strlen($value) > $maxTags[$key]) {
                            $maxTags[$key] = \strlen($value);
                        }
                    }
                }
            }
        }
    }

    $tagsCount = \count($maxTags);
    $tagsNames = array_keys($maxTags);

    $tableHeaders = array_merge(['Service ID'], $tagsNames, ['Class name']);
    $tableRows = [];
    $rawOutput = isset($options['raw_text']) && $options['raw_text'];
    foreach ($serviceIds as $serviceId) {
        $definition = $this->resolveServiceDefinition($container, $serviceId);

        $styledServiceId = $rawOutput ? $serviceId : sprintf('<fg=cyan>%s</fg=cyan>', OutputFormatter::escape($serviceId));
        if ($definition instanceof Definition) {
            if ($showTag) {
                foreach ($this->sortByPriority($definition->getTag($showTag)) as $key => $tag) {
                    $tagValues = [];
                    foreach ($tagsNames as $tagName) {
                        if (\is_array($tagValue = $tag[$tagName] ?? '')) {
                            $tagValue = $this->formatParameter($tagValue);
                        }

                        $tagValues[] = $tagValue;
                    }
                    if (0 === $key) {
                        $tableRows[] = array_merge([$serviceId], $tagValues, [$definition->getClass()]);
                    } else {
                        $tableRows[] = array_merge([' (same service as previous, another tag)'], $tagValues, ['']);
                    }
                }
            } else {
                $tableRows[] = [$styledServiceId, $definition->getClass()];
            }
        } elseif ($definition instanceof Alias) {
            $alias = $definition;
            $tableRows[] = array_merge([$styledServiceId, sprintf('alias for "%s"', $alias)], $tagsCount ? array_fill(0, $tagsCount, '') : []);
        } else {
            $tableRows[] = array_merge([$styledServiceId, $definition::class], $tagsCount ? array_fill(0, $tagsCount, '') : []);
        }
    }

    $options['output']->table($tableHeaders, $tableRows);
}
```

ChatGPT first replied with just this

```text
🤖 Let's break down this method into smaller, more manageable chunks:
```

```php
protected function describeContainerServices(ContainerBuilder $container, array $options = []): void
{
    $showHidden = $this->shouldShowHidden($options);
    $title = $this->generateTitle($options, $showHidden);
    $this->outputTitle($options, $title);

    $serviceIds = $this->getServiceIds($container, $options);
    $serviceIds = $this->applyServiceIdFilter($serviceIds, $options);

    $maxTags = $this->processTags($serviceIds, $container, $options);

    $tagsNames = array_keys($maxTags);
    $tableHeaders = $this->generateTableHeaders($tagsNames);
    $tableRows = $this->generateTableRows($serviceIds, $container, $options, $tagsNames);

    $this->outputTable($options, $tableHeaders, $tableRows);
}
```

This is already q pretty reasonable and much more readable method and it broke the huge method down into logical chunks, very nice! Now lets see if it could refactor the whole code properly:

My prompt:

```text
👱 Show me ALL of the extracted methods in full length.
```

ChatGPT replied with:

```text
🤖 Absolutely, here are all the extracted methods from the refactored code:
```

```php
protected function shouldShowHidden(array $options): bool
{
    return isset($options['show_hidden']) && $options['show_hidden'];
}

protected function generateTitle(array $options, bool $showHidden): string
{
    $title = $showHidden ? 'Symfony Container Hidden Services' : 'Symfony Container Services';

    if ($options['tag'] ?? null) {
        $title .= sprintf(' Tagged with "%s" Tag', $options['tag']);
    }

    return $title;
}

protected function outputTitle(array $options, string $title): void
{
    $options['output']->title($title);
}

protected function getServiceIds(ContainerBuilder $container, array $options): array
{
    if ($options['tag'] ?? null) {
        return isset($options['tag']) && $options['tag']
            ? $this->sortTaggedServicesByPriority($container->findTaggedServiceIds($options['tag']))
            : $this->sortServiceIds($container->getServiceIds());
    }

    return $this->sortServiceIds($container->getServiceIds());
}

protected function applyServiceIdFilter(array $serviceIds, array $options): array
{
    if (isset($options['filter'])) {
        return array_filter($serviceIds, $options['filter']);
    }

    return $serviceIds;
}

protected function processTags(array $serviceIds, ContainerBuilder $container, array $options): array
{
    $maxTags = [];
    
    foreach ($serviceIds as $serviceId) {
        $definition = $this->resolveServiceDefinition($container, $serviceId);

        if ($definition instanceof Definition) {
            if ($options['tag']) {
                $maxTags = $this->computeMaxTags($maxTags, $definition, $options);
            }
        }
    }

    return $maxTags;
}

protected function computeMaxTags(array $maxTags, Definition $definition, array $options): array
{
    $showTag = $options['tag'];
    $tags = $definition->getTag($showTag);

    foreach ($tags as $tag) {
        foreach ($tag as $key => $value) {
            if (!isset($maxTags[$key])) {
                $maxTags[$key] = \strlen($key);
            }
            if (\is_array($value)) {
                $value = $this->formatParameter($value);
            }

            if (\strlen($value) > $maxTags[$key]) {
                $maxTags[$key] = \strlen($value);
            }
        }
    }

    return $maxTags;
}

protected function generateTableHeaders(array $tagsNames): array
{
    return array_merge(['Service ID'], $tagsNames, ['Class name']);
}

protected function generateTableRows(array $serviceIds, ContainerBuilder $container, array $options, array $tagsNames): array
{
    $tableRows = [];
    $rawOutput = isset($options['raw_text']) && $options['raw_text'];

    foreach ($serviceIds as $serviceId) {
        $definition = $this->resolveServiceDefinition($container, $serviceId);

        $styledServiceId = $rawOutput ? $serviceId : sprintf('<fg=cyan>%s</fg=cyan>', OutputFormatter::escape($serviceId));
        if ($definition instanceof Definition) {
            if ($options['tag']) {
                $tableRows = $this->handleTaggedDefinition($definition, $serviceId, $tagsNames, $tableRows);
            } else {
                $tableRows[] = [$styledServiceId, $definition->getClass()];
            }
        } elseif ($definition instanceof Alias) {
            $alias = $definition;
            $tableRows[] = array_merge([$styledServiceId, sprintf('alias for "%s"', $alias)], array_fill(0, count($tagsNames), ''));
        } else {
            $tableRows[] = array_merge([$styledServiceId, $definition::class], array_fill(0, count($tagsNames), ''));
        }
    }

    return $tableRows;
}

protected function handleTaggedDefinition(Definition $definition, string $serviceId, array $tagsNames, array $tableRows): array
{
    $sortedTags = $this->sortByPriority($definition->getTag($options['tag']));
    
    foreach ($sortedTags as $key => $tag) {
        $tagValues = [];
        foreach ($tagsNames as $tagName) {
            if (\is_array($tagValue = $tag[$tagName] ?? '')) {
                $tagValue = $this->formatParameter($tagValue);
            }

            $tagValues[] = $tagValue;
        }
        if ($key === 0) {
            $tableRows[] = array_merge([$serviceId], $tagValues, [$definition->getClass()]);
        } else {
            $tableRows[] = array_merge([' (same service as previous, another tag)'], $tagValues, ['']);
        }
    }

    return $tableRows;
}

protected function outputTable(array $options, array $tableHeaders, array $tableRows): void
{
    $options['output']->table($tableHeaders, $tableRows);
}
```

## Conclusion

ChatGTP can be already used to improve readability and maintainability of code a lot by simply telling it to follow the instructions from the suprisingly short initial promt.

On the negative side is that it also likes to over engineers, but this is subject to an opinionated debate what exactly over engineered means, I leave this up to personal opinion of the reader.
