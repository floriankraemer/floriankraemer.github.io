---
layout: page
title: Articles
label: Writing
permalink: /articles/
---

{%- if site.posts.size > 0 %}
<ul class="post-cards">
  {%- for post in site.posts %}
  {% include post-card.html post=post %}
  {%- endfor %}
</ul>
{%- else %}
<p class="no-articles">No articles published yet. Check back soon!</p>
{%- endif %}
