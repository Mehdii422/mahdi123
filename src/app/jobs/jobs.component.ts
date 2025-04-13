import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { NgFor } from '@angular/common';
import { JobOffers } from '../job-offers';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    NgFor, 
    RouterModule, 
    SidebarComponent // Make sure this is properly imported
  ],
  template: `

    <div class="sidebar-wrapper">
      <app-sidebar (filtersChanged)="onFiltersChanged($event)"></app-sidebar>
    </div>

    <div class="jobs-layout">
      <div class="offers-container">
        <div class="job-list">
          <div *ngFor="let job of filteredOffers" class="job-card">
            <a [routerLink]="['/details', job.id]">
              <img [src]="job.photo" alt="{{ job.nom }}" class="job-image">
              <h3>{{ job.nom }}</h3>
              <p><strong>Location:</strong> {{ job.lieu }}</p>
              <p><strong>For Students:</strong> {{ job.part_time ? 'Yes' : 'No' }}</p>
              <p><strong>Domain:</strong> {{ job.domain }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobOffers: JobOffers[] = [];
  filteredOffers: JobOffers[] = [];
  currentFilters: any = {};

  constructor(private jobService: JobService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.jobOffers = this.jobService.filterJobOffers({
          nom: params['search']
        });
      } else {
        this.jobOffers = this.jobService.getAllJobOffers();
      }
      this.filteredOffers = [...this.jobOffers];
    });
  }

  onFiltersChanged(filters: any) {
    this.currentFilters = filters;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredOffers = this.jobOffers.filter(job => {
      const locationMatch = !this.currentFilters.location || 
        job.lieu.toLowerCase().includes(this.currentFilters.location.toLowerCase());
      const typeMatch = (!this.currentFilters.flexible || job.part_time) && 
                       (!this.currentFilters.fullTime || !job.part_time);
      return locationMatch && typeMatch;
    });
  }
}
