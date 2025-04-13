import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { JobOffers } from '../job-offers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <section class="listing-feature">
        <h2 class="section-heading">à propos de cette offre</h2>
      </section>

      <div class="listing-photo-flex">
        <img *ngIf="JobOffers?.photo" [src]="JobOffers?.photo" [alt]="JobOffers?.nom">
      </div>
 
      <div class="details-grid">
        <section class="listing-description">
          <h2 class="listing-heading">{{ JobOffers?.nom }}</h2>
          <p class="listing-location">{{ JobOffers?.lieu }}, {{ JobOffers?.governorat }}</p>
          <p class="available">
            <strong>L'emploi est flexible (pour étudiants) : {{ JobOffers?.part_time ? 'Oui' : 'Non' }}</strong>
          </p>
          <p class="description">
            Description de l'offre : {{ JobOffers?.description }}
          </p>
        </section>
      </div>
        
      <!-- Listing-apply section -->
      <section class="listing-apply">
        <ng-container *ngIf="userType === 'etudiant' || userType === 'jobseeker'; else notStudentOrJobseeker">
          <!-- A simple button to apply -->
          <button (click)="submitApplication()" class="primary">Postuler</button>

          <div class="entrepreneur-details" *ngIf="JobOffers?.entrepreneur">
            <h3>Détails de l'entrepreneur</h3>
            <p><strong>Nom:</strong> {{ JobOffers?.entrepreneur?.name }}</p>
            <p><strong>Téléphone:</strong> {{ JobOffers?.entrepreneur?.phone }}</p>
            <button (click)="openChat()">Chat avec l'entrepreneur</button>
          </div>
        </ng-container>

        <ng-template #notStudentOrJobseeker>
          <ng-container *ngIf="userType === 'entrepreneur'; else notLogged">
            <!-- Entrepreneur View -->
            <div *ngIf="isJobOwner; else otherEntrepreneurView">
              <h3>Gestion de l'offre</h3>
              <button (click)="editJob()" class="edit-button">Modifier l'offre</button>
              <button (click)="deleteJob()" class="delete-button">Supprimer l'offre</button>
            </div>
            
            <ng-template #otherEntrepreneurView>
              <p class="owner-message">Vous visualisez une offre publiée par un autre entrepreneur.</p>
            </ng-template>
          </ng-container>
        </ng-template>

        <ng-template #notLogged>
          <div class="auth-prompts">
            <p>Veuillez vous 
              <a [routerLink]="['/login']" class="login-link">connecter</a> 
              ou 
              <a [routerLink]="['/register']" class="register-link">inscrire</a> 
              pour postuler et chatter avec l'entrepreneur.
            </p>
          </div>
        </ng-template>


        <div *ngIf="applicationMessage" class="success-message">
          {{ applicationMessage }}
        </div>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  JobService = inject(JobService);
  JobOffers: JobOffers | undefined;
  isJobOwner: boolean = false;
  user: any;

  // Simulate a logged-in user; replace with your actual authentication logic.
  userIsLogged: boolean = true;

  applicationMessage: string = '';

  userType: string = ''; // Add user type tracking

  editJob(): void {
    if (this.JobOffers) {
      this.router.navigate(['/edit-job', this.JobOffers.id]);
    }
  }

  deleteJob(): void {
    if (this.JobOffers && confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      const result = this.JobService.deleteJob(this.JobOffers.id, this.user?.id || 0);
      if (result.success) {
        this.router.navigate(['/']);
      } else {
        alert(result.message);
      }
    }
  }

  ngOnInit(): void {
    const jobOfferId = Number(this.route.snapshot.params['id']);
    this.JobOffers = this.JobService.getJobOffersByID(jobOfferId);

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userType = this.user.type;

      if (this.userType === 'entrepreneur' && this.JobOffers?.entrepreneur) {
        this.isJobOwner = this.user.id === this.JobOffers.entrepreneur.id;}
    }
  }
  
  submitApplication(): void {
    // Customize the application submission as necessary.
    this.JobService.submitApplication('dummy', 'dummy', 'dummy@example.com');
    this.applicationMessage = 'Votre candidature a bien été envoyée!';
  }

  openChat(): void {
    if (this.JobOffers?.entrepreneur?.chatId) {
      console.log(`Opening chat with ${this.JobOffers.entrepreneur.name} (chat id: ${this.JobOffers.entrepreneur.chatId})`);
      this.router.navigate(['/chat', this.JobOffers.entrepreneur.chatId]);
    } else {
      console.warn('Chat ID is not available.');
    }
  }
}
