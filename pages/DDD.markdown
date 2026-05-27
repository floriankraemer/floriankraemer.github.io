---
layout: page
title: DDD
permalink: /ddd/
---

Domain-Driven Design (DDD) techniques and practices.

## Techniques

<div class="services-grid">
  <div class="service-item">
    <h3><a href="/ddd/event-storming/">Event Storming</a></h3>
    <p>A versatile technique that leverages domain events to explore and model complex business processes.</p>
  </div>

  <div class="service-item">
    <h3><a href="/ddd/domain-storytelling/">Domain Storytelling</a></h3>
    <p>A collaborative modeling technique to capture and understand business processes through visual stories.</p>
  </div>
</div>

<style>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.service-item {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.service-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: #3498db;
}

.service-item h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  border: none;
  padding: 0;
}

.service-item h3 a {
  color: inherit;
  text-decoration: none;
}

.service-item h3 a:hover {
  color: #3498db;
  text-decoration: none;
}

.service-item h3 a::before {
  content: none;
}

.service-item p {
  margin: 0;
  line-height: 1.5;
  color: #555;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
