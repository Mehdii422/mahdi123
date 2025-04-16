import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService, FilterCriteria } from '../job.service';
import { CommonModule } from '@angular/common';
import { JobOffers } from '../job-offers';

@Component({
  selector: 'app-filtered-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink], // Ajoutez RouterLink ici
  template: `
  <div class="offers-container">
    <h2 class="title">Filtrage des offres : {{ domain }}</h2>

    <div class="job-list">
      <div *ngFor="let job of filteredJobs" class="job-card">
        <a [routerLink]="['/details', job.id]">
          <img [src]="job.photo" alt="photo de l'offre {{ job.nom }}" class="job-image" />
          <h3>{{ job.nom }}</h3>
          <p><strong>Location:</strong> {{ job.lieu }}, {{ job.governorat }}</p>
          <p><strong>For Students:</strong> {{ job.part_time ? 'Yes' : 'No' }}</p>
          <p><strong>Domain:</strong> {{ job.domain }}</p>
        </a>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./filtered-jobs.component.scss']
})
export class FilteredJobsComponent implements OnInit {
  filteredJobs: JobOffers[] = [];
  domain: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.domain = this.route.snapshot.params['domain'];
    console.log('Received domain parameter:', this.domain);

    const criteria: FilterCriteria = { domain: this.domain };
    this.jobService.filterJobOffers(criteria).subscribe(jobs => {
      this.filteredJobs = jobs;
      console.log('Filter results:', this.filteredJobs);
    });

    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        const criteria: FilterCriteria = { nom: params['search'] };
        this.jobService.filterJobOffers(criteria).subscribe(jobs => {
          this.filteredJobs = jobs;
        });
      } else if (this.route.snapshot.params['domain']) {
        const criteria: FilterCriteria = { domain: this.route.snapshot.params['domain'] };
        this.jobService.filterJobOffers(criteria).subscribe(jobs => {
          this.filteredJobs = jobs;
        });
      }
    });
  }

}
