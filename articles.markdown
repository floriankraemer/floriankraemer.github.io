---
layout: page
title: Articles
permalink: /articles/
---

<ul>
  {% for post in site.posts %}
    <li>
      {{ post.date | date_to_long_string: "ordinal" }} - <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
