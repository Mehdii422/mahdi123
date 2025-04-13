import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [NgFor, RouterLink],
  template: `
  <section class="categories-section">
  <h2 class="categories-title">Browse by Category</h2>

  <div class="categories-grid">
    <div class="category-card" *ngFor="let category of categories">
      <!-- Category Icon -->
      <a [routerLink]="['/categories', category.name]">
      
      <img
        [src]="category.icon"
        [alt]="category.name"
        class="category-icon"
      />

      <!-- Category Name -->
      <h3 class="category-name">{{ category.name }}</h3>

      <!-- Job Count -->
      <p class="category-jobs">{{ category.jobs }} jobs</p></a>
    </div>
  </div>
</section>
  `,
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories = [
    { name: 'Agriculture', jobs: 1254, icon: 'assets/icons/agriculture.jpg' },
    { name: 'Metal Production', jobs: 892, icon: 'assets/icons/metal-production.png' },
    { name: 'Transport', jobs: 1150, icon: 'assets/icons/transport.jpg' },
    { name: 'Santé', jobs: 1517, icon: 'assets/icons/sante.jpg'},
    { name: 'commerce', jobs: 2027, icon: 'assets/icons/commerce.png' }, // Changed to lowercase
    { name: 'Construction', jobs: 1520, icon: 'assets/icons/construction.jpg' },
    { name: 'Hotels & Tourisme', jobs: 1022, icon: 'assets/icons/hotels-tourism.jpg' }, // Changed spelling
    { name: 'Education', jobs: 1448, icon: 'assets/icons/education.jpg' },
    { name: 'Financial Services', jobs: 1529, icon: 'assets/icons/finance.jpg' },
    { name: 'Web', jobs: 1529, icon: 'assets/icons/web.jpg' } // Capitalized
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
