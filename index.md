---
layout: page
title: cloudaice 
tagline: Supporting tagline
---
{% include JB/setup %}

<div>
<ul>
  {% for post in site.posts limit:2 %}
    <article class="content">
      <section class='title'>
          <h2><a href="{{ BASE_PATH}}{{ post.url }}">{{ post.title }}</a></h2>
      </section>

      <section class="meta">
          <span class='time'>
              <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
          </span>
      </section>

      <section class="post">
          {{ post.content }}
      </section>
    </article>
  {% endfor %}
</ul>
<div class='center'>
  <a href="/archive.html" class='circle-wrapper'>
  <div class='circle'>&nbsp;</div>
  <div class='circle'>&nbsp;</div>
  <div class='circle'>&nbsp;</div>
  </a>
</div>
</div>

