---
layout: page
title: Articles
permalink: /articles/
---

<div class="home">
  {%- if site.posts.size > 0 -%}
    <ul class="post-list">
      {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
      {%- for post in site.posts -%}
      <li class="post-card">
        <div class="post-card-content">
          <span class="post-meta">📅 {{ post.date | date: date_format }}</span>
          <h3>
            <a class="post-link" href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
            </a>
          </h3>
          {%- if site.show_excerpts -%}
            <div class="post-excerpt">
              {{ post.excerpt }}
            </div>
          {%- endif -%}

        </div>
      </li>
      {%- endfor -%}
    </ul>
  {%- else -%}
    <div class="no-articles">
      <p>No articles published yet. Check back soon!</p>
    </div>
  {%- endif -%}
</div>
