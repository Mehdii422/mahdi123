import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../job.service';
import { JobOffers } from '../job-offers';

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="manage-account">
      <h2>Manage Your Account</h2>
      <p>Welcome, {{ user?.firstName }}</p>
      
      <!-- Tab Navigation -->
      <div class="tabs">
        <button [class.active]="selectedTab==='profile'" (click)="selectedTab='profile'">
          Profile
        </button>
        <button *ngIf="isEtudiantOrJobSeeker()" [class.active]="selectedTab==='cvPortfolio'" (click)="selectedTab='cvPortfolio'">
          CV & Portfolio
        </button>
        <button *ngIf="user?.type==='Etudiant'" [class.active]="selectedTab==='availability'" (click)="selectedTab='availability'">
          Availability
        </button>
        <button *ngIf="isEntrepreneur" [class.active]="selectedTab==='postjob'" (click)="selectedTab='postjob'">
          Post a Job
        </button>
        <button *ngIf="isEntrepreneur" [class.active]="selectedTab==='myjobs'" (click)="selectedTab='myjobs'">
          My Job Offers
        </button>
        <button *ngIf="isEtudiantOrJobSeeker()" [class.active]="selectedTab==='applications'" (click)="selectedTab='applications'">
          My Applications
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Profile Tab (for all users) -->
        <div *ngIf="selectedTab==='profile'">
          <h3>Edit Profile</h3>
          <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" [(ngModel)]="user.firstName" name="firstName" required>
            
            <label for="email">Email</label>
            <input id="email" type="email" [(ngModel)]="user.email" name="email" required>
            
            <label for="bio">Bio</label>
            <textarea id="bio" [(ngModel)]="user.bio" name="bio"></textarea>
            
            <button type="submit" [disabled]="profileForm.invalid">Update Profile</button>
          </form>
        </div>

        <!-- CV & Portfolio Tab (for Etudiant and JobSeeker) -->
        <div *ngIf="selectedTab==='cvPortfolio' && isEtudiantOrJobSeeker()">
          <h3>CV & Portfolio</h3>
          <form (ngSubmit)="updateCvPortfolio()" #cvPortfolioForm="ngForm">
            <label for="cv">Upload CV</label>
            <input id="cv" type="file" (change)="handleFileInput($event, 'cv')">

            <label for="portfolio">Upload Portfolio</label>
            <input id="portfolio" type="file" (change)="handleFileInput($event, 'portfolio')">

            <button type="submit">Update CV & Portfolio</button>
          </form>
        </div>


        <!-- Availability Tab (only for Etudiant) -->
        <div *ngIf="selectedTab==='availability' && user?.type==='Etudiant'">
          <h3>Modify Availability</h3>
          <form (ngSubmit)="updateAvailability()" #availabilityForm="ngForm">
            <div *ngFor="let day of weekDays; let i = index" class="day-row">
              <label>{{ day }}:</label>
              <span>Start:</span>
              <input type="time" [(ngModel)]="availability[i].start" name="start{{i}}">
              <span>End:</span>
              <input type="time" [(ngModel)]="availability[i].end" name="end{{i}}">
            </div>
            <button type="submit" [disabled]="availabilityForm.invalid">Update Availability</button>
          </form>
        </div>

        <!-- Applications Tab (for Etudiant and JobSeeker) -->
        <div *ngIf="selectedTab==='applications' && isEtudiantOrJobSeeker()">
          <h3>My Applications</h3>
          <div *ngIf="appliedJobs.length === 0">
            <p>You have not applied to any jobs yet.</p>
          </div>
          <ul *ngIf="appliedJobs.length > 0">
            <li *ngFor="let job of appliedJobs; let i = index">
              <span>{{ job.nom }} ({{ job.lieu }})</span>
              <button (click)="withdrawApplication(i)">Withdraw</button>
            </li>
          </ul>
        </div>

        <!-- Post a Job Tab (only for Entrepreneurs) -->
        <div *ngIf="postingStatus.loading" class="loading-message">
          Posting job...
        </div>
        <div *ngIf="postingStatus.message" class="message" [class.error]="postingStatus.isError">
          {{postingStatus.message}}
        </div>
        <div *ngIf="selectedTab==='postjob' && isEntrepreneur">
          <h3>Post a New Job Offer</h3>
          <form (ngSubmit)="postOffer()" #offerForm="ngForm">
            <label>Titre de l'offre</label>
            <input type="text" [(ngModel)]="newOffer.nom" name="nom" required>
  
            <label>Lieu</label>
            <input type="text" [(ngModel)]="newOffer.lieu" name="lieu" required>
  
            <label>Governorat</label>
            <select [(ngModel)]="newOffer.governorat" name="governorat" required>
              <option value="" selected>Choisir une ville</option>
              <option value="Nabeul">Nabeul</option>
              <option value="le Kef">le Kef</option>
              <option value="tunis">tunis</option>
              <option value="ariana">ariana</option>
              <option value="ben arous">ben arous</option>
              <option value="mannouba">mannouba</option>
              <option value="beja">beja</option>
              <option value="ain drahem">ain drahem</option>
              <option value="benzart">benzart</option>
              <option value="seliana">seliana</option>
              <option value="zaghouen">zaghouen</option>
              <option value="kasserine">kasserine</option>
              <option value="kairouen">kairouen</option>
              <option value="sousse">sousse</option>
              <option value="mahdia">mahdia</option>
              <option value="monastir">monastir</option>
              <option value="sidi bouzid">sidi bouzid</option>
              <option value="gafsa">gafsa</option>
              <option value="tozeur">tozeur</option>
              <option value="kebili">kebili</option>
              <option value="sfax">sfax</option>
              <option value="tataouine">tataouine</option>
              <option value="jerjis">jerjis</option>
              <option value="jerba">jerba</option>
            </select>
  
            <label>Domain</label>
            <input type="text" [(ngModel)]="newOffer.domain" name="domain" required>
  
            <label>Description</label>
            <textarea [(ngModel)]="newOffer.description" name="description"></textarea>
  
            <label>Part Time?</label>
            <input type="checkbox" [(ngModel)]="newOffer.part_time" name="part_time">
  
            <button type="submit" [disabled]="offerForm.invalid">Add Job</button>
          </form>
        </div>

        <!-- My Jobs Tab (only for Entrepreneurs) -->
        <div *ngIf="selectedTab==='myjobs' && isEntrepreneur">
          <h3>My Job Offers</h3>
          <div *ngIf="myJobs.length < 3" class="warning-message">
            <p>Warning: You must maintain at least 3 active job offers.</p>
          </div>
          <div *ngIf="myJobs.length === 0">
            <p>You haven't posted any jobs yet.</p>
          </div>
          <div *ngIf="myJobs.length > 0">
            <div *ngFor="let job of myJobs" class="job-card">
              <h4>{{ job.nom }}</h4>
              <p>{{ job.lieu }}, {{ job.governorat }}</p>
              <p>Domain: {{ job.domain }}</p>
              <p>Status: {{ job.encore_valable ? 'Available' : 'Filled' }}</p>
              <button (click)="editJob(job)">Edit</button>
              <button (click)="deleteJob(job.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
  ,
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent implements OnInit {
  user: any;
  isEntrepreneur: boolean = false;
  selectedTab: string = 'profile'; // Options: 'profile', 'cvPortfolio', 'availability', 'applications', 'postjob'
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  postingStatus: {loading: boolean, message: string, isError: boolean} = {
    loading: false,
    message: '',
    isError: false
  };
  
  handleFileInput(event: Event, type: 'cv' | 'portfolio'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Save the base64-encoded file into user object
        if (type === 'cv') {
          this.user.cv = reader.result;
        } else if (type === 'portfolio') {
          this.user.portfolio = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  


  // For availability (only for Etudiant)
  // Simulated as an array of 7 objects (one per day)
  availability: { start: string, end: string }[] = [
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' }
  ];

  // For simulation, an array to hold the job applications.
  appliedJobs: JobOffers[] = [];
  myJobs: JobOffers[] = [];

  // Default job offer object; for entrepreneurs.
  newOffer: JobOffers = {
    id: 0,
    nom: '',
    lieu: '',
    governorat: '',
    photo: '/assets/default-job.jpg',
    encore_valable: true,
    part_time: false,
    domain: '',
    description: '',
    entrepreneur: {
      id: 0,
      name: '',
      phone: '',
      chatId: ''
    }
  };

  constructor(private router: Router, @Inject(JobService) private jobService: JobService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.isEntrepreneur = this.user.type === 'entrepreneur';
        if (this.isEntrepreneur) {
          this.loadMyJobs();
        }
      } catch (err) {
        console.error('Error parsing currentUser', err);
      }
    }

    // For demonstration: simulate appliedJobs from localStorage.
    const storedApplications = localStorage.getItem('appliedJobs');
    if (storedApplications) {
      this.appliedJobs = JSON.parse(storedApplications);
    }
  }

  loadMyJobs(): void {
    if (this.user?.id) {
      this.jobService.getJobOffersByEntrepreneur(this.user.id).subscribe((jobs: JobOffers[]) => {
        this.myJobs = jobs;
      });
    }
  }

  editJob(job: JobOffers): void {
    this.selectedTab = 'postjob';
    this.newOffer = {...job};
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job offer?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
          this.loadMyJobs();
        },
        error: (err) => {
          alert('Failed to delete job offer.');
          console.error(err);
        }
      });
    }
  }

  async postOffer(): Promise<void> {
    this.postingStatus = {loading: true, message: '', isError: false};
    
    // Add entrepreneur information
    this.newOffer.entrepreneur = {
      id: this.user.id,
      name: this.user.firstName + ' ' + this.user.lastName,
      phone: this.user.phone || '',
      chatId: this.jobService.generateChatId()
    };
  
    this.jobService.addJobOffer(this.newOffer).subscribe({
      next: (response) => {
        this.postingStatus = {loading: false, message: 'Job offer added successfully!', isError: false};
        this.newOffer = {
          id: 0,
          nom: '',
          lieu: '',
          governorat: '',
          photo: '/assets/default-job.jpg',
          encore_valable: true,
          part_time: false,
          domain: '',
          description: '',
          entrepreneur: {
            id: 0,
            name: '',
            phone: '',
            chatId: ''
          }
        };
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.postingStatus = {loading: false, message: 'Failed to add job offer.', isError: true};
        console.error(err);
      }
    });
  }
  updateProfile(): void {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    alert('Profile updated successfully!');
  }

  updateCvPortfolio(): void {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    alert('CV and Portfolio updated successfully!');
  }

  updateAvailability(): void {
    if (this.user.type === 'Etudiant') {
      this.user.availability = this.availability;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      alert('Availability updated successfully!');
    }
  }

  // Removed duplicate implementation of postOffer

  withdrawApplication(index: number): void {
    this.appliedJobs.splice(index, 1);
    localStorage.setItem('appliedJobs', JSON.stringify(this.appliedJobs));
  }

  // Convenience method to check if user is Etudiant or JobSeeker (for CV & Portfolio and Applications)
  isEtudiantOrJobSeeker(): boolean {
    return this.user && (this.user.type === 'Etudiant' || this.user.type === 'jobseeker');
  }
}