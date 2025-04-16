import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Modifier l'offre d'emploi</h2>
    <form [formGroup]="editJobForm" (ngSubmit)="onSubmit()">
      <label for="nom">Nom:</label>
      <input id="nom" formControlName="nom" />
      <div *ngIf="editJobForm.get('nom')?.invalid && editJobForm.get('nom')?.touched">
        Le nom est requis.
      </div>

      <label for="lieu">Lieu:</label>
      <input id="lieu" formControlName="lieu" />

      <label for="governorat">Gouvernorat:</label>
      <input id="governorat" formControlName="governorat" />

      <label for="photo">Photo URL:</label>
      <input id="photo" formControlName="photo" />

      <label for="part_time">Emploi flexible (part-time):</label>
      <input type="checkbox" id="part_time" formControlName="part_time" />

      <label for="domain">Domaine:</label>
      <input id="domain" formControlName="domain" />

      <label for="description">Description:</label>
      <textarea id="description" formControlName="description"></textarea>

      <button type="submit" [disabled]="editJobForm.invalid">Enregistrer</button>
      <button type="button" (click)="cancel()">Annuler</button>
    </form>
    <div *ngIf="message">{{ message }}</div>
  `
})
export class EditJobComponent implements OnInit {
  editJobForm!: FormGroup;
  jobId: number = 0;
  message: string = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private jobService = inject(JobService);

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.params['id']);
    this.editJobForm = this.fb.group({
      nom: ['', Validators.required],
      lieu: [''],
      governorat: [''],
      photo: [''],
      part_time: [false],
      domain: [''],
      description: ['']
    });

    this.jobService.getJobOffersByID(this.jobId).subscribe({
      next: (job) => {
        this.editJobForm.patchValue({
          nom: job.nom,
          lieu: job.lieu,
          governorat: job.governorat,
          photo: job.photo,
          part_time: job.part_time,
          domain: job.domain,
          description: job.description
        });
      },
      error: (err: any) => {
        this.message = 'Erreur lors du chargement de l\'offre: ' + (err.message || 'Erreur inconnue');
      }
    });
  }

  onSubmit(): void {
    if (this.editJobForm.valid) {
      const updatedJob = { ...this.editJobForm.value, id: this.jobId };
      this.jobService.updateJobOffer(updatedJob).subscribe({
        next: () => {
          this.message = 'Offre mise à jour avec succès.';
          setTimeout(() => this.router.navigate(['/details', this.jobId]), 1500);
        },
        error: (err: any) => {
          this.message = 'Erreur lors de la mise à jour: ' + (err.error?.message || err.message || 'Erreur inconnue');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/details', this.jobId]);
  }
}
