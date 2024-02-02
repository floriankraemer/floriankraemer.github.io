---
layout: post
date: 2015-07-22 00:02:51 +0000
tags:
    - cakephp
---

In CakePHP 2.x it was pretty cumbersome to get the language across all pages into the URL. With CakePHP 3 it is just awesome and easy. [You can now create persistent URL parameters](http://book.cakephp.org/3.0/en/development/routing.html#creating-persistent-url-parameters).

This is basically all you need for the most basic implementation inside your config/routes.php. The code is mostly the same as in the previous link to the persistent URL parameters page but I've added the default language so that it is always present. If you don't want a default language to be always present just remove the elseif part. Notice that you'll have to add routes into the /:language/* scope to inject it.

```php
Router::addUrlFilter(function ($params, $request) {
    if (isset($request->params['language']) && !isset($params['language'])) {
        $params['language'] = $request->params['language'];
    } elseif (!isset($params['language'])) {
        $params['language'] = 'eng'; // set your default language here
    }
    return $params;
});

Router::scope('/:language/*', function ($routes) {
    // All URLs with the language go here
});
```

If you now want to change the URL to something else by a simple click on a flag for example you can use a simple link like this to change it:

```php
echo $this->Html->link(__('German'), ['language' => 'deu']);
```

If you don't want the language to be part of the URL but still detect the language somehow you can use the LocaleSelector dispatcher filter that will get it from the client. This is straight taken from the CakePHP book:

<blockquote>By using the LocaleSelectorFilter in your application, CakePHP will automatically set the locale based on the current user:</blockquote>

```php
// in config/bootstrap.php
DispatcherFactory::add('LocaleSelector');

// Restrict the locales to only en-US, fr-FR
DispatcherFactory::add('LocaleSelector', ['locales' => ['en-US', 'fr-FR']]);
```

