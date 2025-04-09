import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { NgFor } from '@angular/common';
import { JobOffers } from '../job-offers';


@Component({
  selector: 'app-jobs',
  imports: [NgFor],
  template: `
    <div class="offers-container">
      <div class="job-list">
        <div *ngFor="let job of jobOffers" class="job-card">
          <img [src]="job.photo" alt="{{ job.nom }}" class="job-image">
          <h3>{{ job.nom }}</h3>
          <p><strong>Location:</strong> {{ job.lieu }}</p>
          <p><strong>For Students:</strong> {{ job.part_time ? 'Yes' : 'No' }}</p>
          <p><strong>Domain:</strong> {{ job.domain }}</p>
        </div>
      </div>
    </div>    
  `,
  styleUrl: './jobs.component.scss'
})
export class JobsComponent  implements OnInit {
  jobOffers: JobOffers[] = [];
 
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobOffers = this.jobService.getAllJobOffers();
  }
}
