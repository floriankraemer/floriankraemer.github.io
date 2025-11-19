---
layout: post
date: 2015-10-15 23:21:42 +0000
tags:
   - cakephp
   - development
title: CakePHP and Angular Pagination
categories:
   - CakePHP
---

It is actually pretty easy to make your RESTful calls in CakePHP paginateable by using what the [Paginator Component](http://book.cakephp.org/3.0/en/controllers/components/pagination.html) already offers us and using [Angular UI Bootstrap Paginator](https://angular-ui.github.io/bootstrap/#/pagination) on the client-side code. On our server side, we just use [the built-in serialization](http://book.cakephp.org/3.0/en/views/json-and-xml-views.html) of CakePHP to generate the response. This is an example of a CakePHP controller `index()` method that is paginateable:

```php
public function index() {
   if (empty($this->request->params['paging'][$this->Table->alias()])) {
      $paging = false;
   } else {
      $paging = $this->request->params['paging'][$this->Table->alias()];
   }
   $query = $this->Table->find();
   $this->set('records', $this->paginate($query));
   $this->set('paging', $paging);
   $this->set('_serialize', ['records', 'paging']);
}
```

Now let's fetch the data via a custom Angular JS service in our Angular controller. The service "someApiService" is doing nothing more than a [$http.get()](https://docs.angularjs.org/api/ng/service/$http) call internally and resolving the result and then returning the promise again.

```js
var getData = function(options) {
   someApiService.getData(options).then(function(result) {
      $scope.records = result.records;
      $scope.paging = result.paging;
   });
};
```

We also need a method to do the page change when one of the pagination links is clicked, so that a new request is done with the "page" param is issued. This is actually the reason we've wrapped the API call in a function; we don't have to duplicate the code. You'll call getData() one time to load the data when you enter the page and later each time a page button is clicked.

```js
$scope.pageChanged = function () {
   getData({
      params: {
         page: $scope.paging.page
      }
   });
};
```

In your Angular view:

```js
<uib-pagination 
   items-per-page="paging.perPage"
   total-items="paging.count"
   ng-model="paging.page"
   ng-change="pageChanged()">
</uib-pagination>
```

That's all; as you can see, it is pretty easy to get AJAX pagination working with these two awesome frameworks!
