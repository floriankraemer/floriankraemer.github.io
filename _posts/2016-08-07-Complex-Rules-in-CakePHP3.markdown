---
layout: post
date: 2016-08-07 01:31:28 +0000
tags: 
    - cakephp
---

I had a pretty interesting task recently. We have profiles that must implement certain constraints depending on what kind of profile / product the client purchased. So a profile can have a specific number of languages depending on the constraints. This means we need to validate the number of languages an user has picked by a value from another database table that needs to be picked up somehow at runtime.

## Why a validation rule ~~won't~~ can't do the job

**Validation rules are stateless.** They are intended to operate in a stateless way. They are best leveraged to ensure that the shape, data types, and format of data are correct.

**Application rules are stateful**, so they are best leveraged to check stateful properties of your entities. For example, validation rules could ensure that an email address is valid, while an application rule could ensure that the email address is unique.

When validation rules are applied the entity has not yet been marshalled, in other words, the entity has not yet really been constructed and processed, the data is still a simple array.

So when you inspect the $context, the 2nd arg of a validation rule, you'll notice that the `data` key of the array just contains what you've passed, but **not** the whole entity!

## Application rules will do it

An application rule will run after the entity object was built by the marshaller and you'll have all data available you need that was passed and merged if you used patchEntity() for example.

See the "[Creating custom rule objects](http://book.cakephp.org/3.0/en/orm/validation.html#creating-custom-rule-objects)" section of the official documentation on how to create your own rule objects.

```php
<?php
namespace App\Model\Rule;

use Cake\Datasource\EntityInterface;
use Cake\ORM\TableRegistry;
use RuntimeException;

class ProfileLanguageLimitRule {

   /**
    * Performs the check
    *
    * @link http://php.net/manual/en/language.oop5.magic.php
    * @param \Cake\Datasource\EntityInterface $entity Entity.
    * @param array $options Options.
    * @return bool
    */
   public function __invoke(EntityInterface $entity, array $options) {
      if (!isset($entity->profile_constraint->amount_of_languages)) {
         if (!isset($entity->profile_constraint_id)) {
            throw new RuntimeException('Profile Constraint ID is missing!');
         }
         $languageLimit = $this->_getConstraintFromDB($entity);
      } else {
         $languageLimit = $entity->profile_constraint->amount_of_languages;
      }

      // Unlimited languages are represented by -1
      if ($languageLimit === -1) {
         return true;
      }

      // -1 Here because the language_id of the profiles table already counts as one language
      // So it's always -1 of the constraint value
      $count = count($entity->languages);
      return $count <= ($languageLimit - 1);
   }

   /**
    * Gets the limitation from the ProfileConstraints Table object.
    *
    * @param \Cake\Datasource\EntityInterface $entity Entity.
    * @return int
    */
   protected function _getConstraintFromDB(EntityInterface $entity) {
      $constraintsTable = TableRegistry::get('ProfileConstraints');
      $constraint = $constraintsTable->find()
         ->where([
            'id' => $entity['profile_constraint_id']
         ])
         ->select([
            'amount_of_languages'
         ])
         ->firstOrFail();

      return $constraint->amount_of_languages;
   }

}
```

## Conclusion

Application rules are a nice thing to work with in CakePHP3 even though they might not be that easy to understand at first glance. You can implement more complex requirements that require you to work on the DB level to validate the integrity of your requirement and database as application rules.
