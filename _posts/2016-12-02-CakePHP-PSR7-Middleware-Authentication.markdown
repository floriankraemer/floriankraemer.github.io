---
layout: post
date: 2016-12-02 17:04:01 +0000
title: "CakePHP3: A new PSR7 Middleware Authentication"
tags: 
    - cakephp
---

Let's start with some background story on this topic. One of the parts of the CakePHP framework I like the less is the authentication and authorization. There are a few reasons why. For example, the authentication and authorization. Firstly, both authentication and authorization have been married through the AuthComponent, secondly, the component is an ugly monolith that is coupled to the controller layer of the MVC pattern.

While CakePHP 3 is an awesome framework, it carries some of the older parts of the framework along to ensure backward compatibility which is, in my personal opinion, good. Software development should be an evolution and not a revolution. Also, a soft migration path should be provided if possible. So the requirement for a new implementation was to stay backward compatible to some degree.

## The new implementation

[https://github.com/cakephp/authentication](https://github.com/cakephp/authentication)

I've been working from time to time late at night to finish a new authentication system for the CakePHP 3 framework based on a PSR7 conform middleware. Which is the place where authentication should happen in my opinion. The request object should carry all information you need to identify a user. Also, you want to identify a user or a service early in the stack.

The authentication has been completely refactored and was moved into a new namespace/authentication, and the code‘s folder structure was reorganized as well. But the biggest change is probably the better split of the logic, a more fancy term is separation of concerns, of the authentication code. The code has been split into authenticators and identifiers. Basically, the authenticator just looks for the credentials in the request and passes them to a collection of identifiers that will use the credentials to identify the identity against different sources. So, for example, you can check the same credentials against a users table using the CakePHP ORM and LDAP at the same time.

The configuration stays almost the same as it was before just that you have to split it for the authenticators and identifiers. Also, hooking the authentication in your app is now happening in the middleware, no longer the controller. But these two things are the most dramatic changes on the surface you’ll be confronted with.

## New features

Besides keeping the existing authenticators, HTTP Digest, HTTP Basic, and Form there is now Token and Session as well. Token is a high level implementation that allows you to use a token from the requests query parameters or a HTTP header. Extending this to use JWT should be trivial.

## Current status and roadmap

The current status of the plugin is that it is ready to be used - technically. What I expect from you, the community, is ideas for improvements and additions. And despite the good unit test coverage of more than 92% I expect bugs to be encountered as usual.

The roadmap for the plugin is to release 1.0.0 along with the official release of CakePHP 3.4. The plugin itself is right now in beta and will make its path to a final release depending on your feedback. So if everything goes well this means the plugin should be tagged 1.0.0 the latest by the end of January 2017.

The long term plan is that the plugin will be integrated into the framework itself. The goal is to get it into CakePHP 3.5 early to mid next year.

## Where is the code? How do I install it?

Check [the official repository](https://github.com/cakephp/authentication) of the plugin and install it via composer as usual.

```sh
composer require cakephp/authentication
```

**Pay attention to the version constraints!** Until CakePHP 3.4 is released it will require the 3.next branch!

The readme.md of the project contains some basic information on how to get started with the new implementation and provides information on how to migrate from the AuthComponent as well.
