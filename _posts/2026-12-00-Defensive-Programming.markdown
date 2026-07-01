---
layout: post
title: 'Defensive programming'
categories: software-architecture
tags: 
    - software-architecture
    - decoupling
    - coupling
draft: true
published: false
comments: true
date: 2025-04-30
---

var email = "some-email";

var email = new Email("some-email");

public class Email() {

    public Email(string email) {
        
    }

    private void AssertValidEmail() {
        
    }
}
