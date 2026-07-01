---
layout: post
date: 2014-01-10 03:08:49 +0000
tags: cakephp
---

If you ever have the need to inject fields or other things into a form, for example when building a blog or CMS system, you can use the event system that comes with CakePHP. The basic concept can be used everywhere within the views and is not limited to forms only, but a form is a good example.

You can find the complete sample as a working application in the [cake2-form-events](https://github.com/burzum/cakephp-samples/tree/cake2-form-events) branch of my [Github cakephp-sample repository](https://github.com/burzum/cakephp-samples).

Please note that this sample code is using PHP 5.4 specific notations.

The form in a view file is dispatching two events, the `View.Form.someFormStart` and `View.Form.someFormEnd` event. The places where these callbacks are fired are the places where custom fields or other output is going to be injected by the triggered event listener callbacks.

```php
$this->Form->create();

$event = new CakeEvent('View.Form.someFormStart', $this);
$this->getEventManager()->dispatch($Event);

echo $this->Form->input('name');

$event = new CakeEvent('View.Form.someFormEnd', $this);
$this->getEventManager()->dispatch($event);

$this->Form->submit(__('Submit'));
$this->Form->end();
```

The event listener class that will inject something into your form events. I would not write a lot of view code in the event listener itself; it is just done for demonstration purposes in this sample. I would always put the additional things I would like to display in an element and only echo that element from the event to keep the view pieces it will inject separated from the event listener to respect separation of concerns.

```php
App::uses('CakeEventListener', 'Event');
App::uses('Object', 'Core');

class FormListener extends Object implements CakeEventListener {

    public function implementedEvents() {
        return [
            'View.Form.someFormStart' => [
                'callable' => 'someFormStart'
            ],
            'View.Form.someFormEnd' => [
                'callable' => 'someFormEnd'
            ]
        ];
    }

    public function someFormStart(CakeEvent $Event) {
        $View = $Event->subject();
        $View->viewVars['user'] = $this->requestAction(
            [
                'controller' => 'samples',
                'action' => 'view',
                '1'
            ]
        );
        echo $View->Form->input('nick_name');
    }

    public function someFormEnd(CakeEvent $Event) {
        $View = $Event->subject();
        echo $View->element('additional_fields');
    }
}
```

You can put your event listeners into App/Event, for example. After you've created your event listener and saved it to App/Event/FormListener.php, you have to attach your listener to the CakeEventManager. In your App/Config/bootstrap.php, add this to attach the listener to the global event manager.

```php
App::uses('CakeEventManager', 'Event');
App::uses('FormListener', 'Event');
CakeEventManager::instance()->attach(new FormListener());
```

The additional_fields element will output the user we fetched in the first event for demonstration purposes to give you an idea of what is possible and how it works, and data is made available between the different steps.

```php
echo $this->Form->input('age');
echo $this->Form->input('gender');
echo h($user['User']['name']);
```

I hope you enjoyed the article and learned something. Any kind of criticism to improve it is welcome!