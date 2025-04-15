import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { JobOffers } from '../job-offers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <section class="listing-feature">
        <h2 class="section-heading">à propos de cette offre</h2>
      </section>

      <div class="listing-photo-flex">
        <img  *ngIf="JobOffers?.photo" [src]="JobOffers?.photo" [alt]="JobOffers?.nom">
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
      <ng-container *ngIf="(userType === 'etudiant' || userType === 'jobseeker'); else notStudentOrJobseeker">

          <!-- A simple button to apply -->
          <button (click)="submitApplication()" class="primary">Postuler</button>

          <div class="entrepreneur-details" *ngIf="JobOffers?.entrepreneur">
            <h3>Détails de l'entrepreneur</h3>
            <p><strong>Nom:</strong> {{ JobOffers?.entrepreneur?.name }}</p>
            <p><strong>Téléphone:</strong> {{ JobOffers?.entrepreneur?.phone }}</p>
          </div>

          <button (click)="openChat()">Chat avec l'entrepreneur</button>

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

  private authService = inject(AuthService);

  applicationMessage: string = '';

  userType: string = ''; // Add user type tracking

  editJob(): void {
    if (this.JobOffers) {
      this.router.navigate(['/edit-job', this.JobOffers.id]);
    }
  }

  deleteJob(): void {
    if (this.JobOffers && confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.JobService.deleteJob(this.JobOffers.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Erreur lors de la suppression de l\'offre : ' + (err.error?.message || err.message || 'Erreur inconnue'));
        }
      });
    }
  }

  ngOnInit(): void {
    const jobOfferId = Number(this.route.snapshot.params['id']);
    this.JobService.getJobOffersByID(jobOfferId).subscribe({
      next: (job) => {
        this.JobOffers = job;
        if (this.userType === 'entrepreneur' && this.JobOffers?.entrepreneur) {
          this.isJobOwner = this.user?.id === this.JobOffers.entrepreneur.id;
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'offre:', err);
      }
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
              this.user = JSON.parse(storedUser);
              this.userType = this.user.type.toLowerCase();
              if (this.userType === 'entrepreneur' && this.JobOffers?.entrepreneur) {
                  this.isJobOwner = this.user.id === this.JobOffers.entrepreneur.id;
              }
          }
      } else {
          this.user = null;
          this.userType = '';
          this.isJobOwner = false;
      }
      console.log('User:', this.user);
      console.log('User type (lowercased):', this.userType);
    });
  }
  
  submitApplication(): void {
    if (!this.JobOffers || !this.user) return;

    // TODO: Implement application submission via backend API
    // For now, show a placeholder message
    this.applicationMessage = 'La fonctionnalité de candidature est en cours de développement.';
  }

  openChat(): void {
    //if (this.JobOffers?.entrepreneur?.chatId) {
      //console.log(`Opening chat with ${this.JobOffers.entrepreneur.name} (chat id: ${this.JobOffers.entrepreneur.chatId})`);
      //this.router.navigate(['/chat', this.JobOffers.entrepreneur.chatId]);
    //} else {
      //console.warn('Chat ID is not available.');
    //}
    const chatId = this.JobOffers?.entrepreneur?.chatId || this.JobOffers?.id || 'default-chat';
    console.log(`Opening chat (chat id: ${chatId})`);
    this.router.navigate(['/chat', chatId]);
  }
}
