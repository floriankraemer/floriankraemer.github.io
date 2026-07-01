The following code shows a real world example of exception driven development that also suffers from a few more issues. The only change made to this code was to rename "something" to "something", to obfuscate the use case and origin of this code. We are looking at an excerpt of a console command implemented using PHP and the Symfony Console library.

```php
    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $lock = $this->lockFactory->createLock('some_thing_cache_warmup', 120);
        if (!$lock->acquire()) {
            $io->comment('Another cache warmup process is already running. Skipping.');
            return Command::SUCCESS;
        }
        $this->setUpRouter();

        try {
            $startTime = microtime(true);
            $builders = $this->somethingBuilderFactory->getLatestBuilders();
            $io->comment('Starting cache warmup for API versions: ' . implode(', ', array_keys($builders)));

            /** @var somethingBuilderInterface $builder */
            foreach ($builders as $version => $builder) {
                $io->section(sprintf('Warming up cache for %s', $version));
                $io->section(sprintf('Processing version %s', $version));

                try {
                    $this->generateFallbackFile($version, $builder, $io);
                } catch (Throwable $e) {
                    $io->error(sprintf(
                        'Failed to generate fallback file for %s: %s',
                        $version,
                        $e->getMessage()
                    ));
                    if ($io->isVerbose()) {
                        $io->writeln($e->getTraceAsString());
                    }
                }

                $io->text(sprintf('Warming up cache for %s', $version));
                $this->somethingBuilderCache->setsomethingBuilder($builder);
                $this->somethingBuilderCache->warmupCache();
            }
            $executionTime = microtime(true) - $startTime;
            $io->success(sprintf(
                'Cache successfully warmed up in %.2f seconds.',
                $executionTime
            ));

            return Command::SUCCESS;
        } catch (Throwable $e) {
            $io->error([
                'Cache warmup failed with error:',
                $e->getMessage()
            ]);

            if ($output->isVerbose()) {
                $io->section('Stack trace');
                $io->text($e->getTraceAsString());
            }

            return Command::FAILURE;
        } finally {
            $lock->release();
        }
    }

    public function generateFallbackFile(string $version, somethingBuilderInterface $builder, SymfonyStyle $io): void
    {
        $fallbackLocale = new Locale($this->fallbackLocale);
        $builder->setLocaleForCLI($fallbackLocale);
        $data = $builder->buildsomething();

        $directory = sprintf('%s/home', $this->fallbackDir);
        if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
            throw new RuntimeException("Failed to create directory: $directory");
        }

        $filename = sprintf('%s/home/%s_%s.serialized', $this->fallbackDir, $version, $fallbackLocale->getValue());
        $serializedData = serialize($data);

        if (file_put_contents($filename, $serializedData) === false) {
            throw new RuntimeException("Failed to write to file: $filename");
        }

        $io->text(sprintf(
            'Generated fallback file for %s: <info>%s</info>',
            $version,
            $filename
        ));
    }
```

## The biggest issues with this

* The method `generateFallbackFile()` uses exceptions to communicate an error message that is caught in another method of the same class in `execute()` just to print the message of the exception as error message via console out.

* The 2x try-catch nesting with the for-each loop inside and additional if-statements is hard to comprehend and unnecessary.

* The logic of the actual thing that is processed here should be extracted from the console command.
