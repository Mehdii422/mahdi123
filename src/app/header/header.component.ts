import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { JobService } from '../job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  template: `
    <header id="header" class="header">
      <div class="header__logo"><a href=""><img src="assets/logo.png" /></a></div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item"><a [routerLink]="['/categories']">Categories</a></li>
          <li class="header__nav-item"><a [routerLink]="['/about']">À propos</a></li>
          <li class="header__nav-item"><a [routerLink]="['/contact']">Contact</a></li>
        </ul>
      </nav>
      <div class="header__search">
        <input 
          type="text" 
          placeholder="Chercher emploi..." 
          [(ngModel)]="searchTerm"
          (keyup.enter)="searchJobs()"
          class="header__search-input"
        />
        <button (click)="onSearch()" class="header__search-button">Search</button>
      </div>
      <nav class="header__user-nav">
      <ul class="header__user-nav-list">
        <ng-container *ngIf="isLoggedIn; else showLoginRegister">
          <li class="header__user-nav-item user-welcome">Bienvenue, {{ currentUserName }}</li>
          <li class="header__user-nav-item">
            <a [routerLink]="['/manage-account']">Gestion du compte</a>
          </li>
          <li class="header__user-nav-item">
            <a href="#" (click)="logout()">Déconnexion</a>
          </li>
        </ng-container>
        <ng-template #showLoginRegister>
          <li class="header__user-nav-item">
            <a [routerLink]="['/login']">Connexion</a>
          </li>
          <li class="header__user-nav-item">
            <a [routerLink]="['/register']">inscription</a>
          </li>
        </ng-template>
      </ul>

      </nav>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUserName: string = '';
  searchTerm: string = '';

  constructor(private router: Router,
     private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state observables for reactive updates
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
    this.authService.currentUserName$.subscribe(name => this.currentUserName = name);
    
    // On first load during this browser session, clear any stored user data
  if (!sessionStorage.getItem('appInitialized')) {
    localStorage.removeItem('currentUser');
    sessionStorage.setItem('appInitialized', 'true');
  }
    this.checkLoggedIn();

    // Subscribe to router events and update header state on navigation end.
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoggedIn();
      });

    // Optional: Hide header on scroll down, show on scroll up

    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (!header) return;

      if (window.scrollY > lastScrollY) {
        // Scrolling Down → Hide Header
        header.classList.add("header-hidden");
      } else {
        // Scrolling Up → Show Header
        header.classList.remove("header-hidden");
      }

      lastScrollY = window.scrollY;
    });
  }

  private checkLoggedIn(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.isLoggedIn = true;
        this.currentUserName = user.firstName || user.email;
      } catch (err) {
        console.error('Error parsing currentUser', err);
        this.isLoggedIn = false;
        this.currentUserName = '';
      }
    } else {
      this.isLoggedIn = false;
      this.currentUserName = '';
    }
  }

  searchJobs(): void {
    console.log('Search term:', this.searchTerm); // Debug 1
    if (this.searchTerm.trim()) {
      console.log('Navigating with search term:', this.searchTerm.trim()); // Debug 2
      this.router.navigate(['/'], { 
        queryParams: { search: this.searchTerm.trim() } 
      });
    }
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/'], {
        queryParams: { search: this.searchTerm.trim() }
      });
    }
  }

  logout(): void {
    // Remove stored user information and navigate home
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.currentUserName = '';
    this.router.navigate(['/']);
  }
}