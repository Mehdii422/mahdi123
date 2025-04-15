import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, BaseUser } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Login</h2>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" type="email" required>
        <label for="password">Password:</label>
        <input id="password" formControlName="password" type="password" required>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
        <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
        <div class="register-link">
          <p>Don't have an account? <a routerLink="/register">Register here</a></p>
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(AuthService) private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user: BaseUser | null = this.authService.validateCredentials(email, password);

      // before : if (user) {
        // Save user data in localStorage manually
        //localStorage.setItem('currentUser', JSON.stringify(user));
        //this.successMessage = 'Login successful! Redirecting...';
        //this.errorMessage = '';
        // Redirect to home page
        //setTimeout(() => this.router.navigate(['']), 1500);}

      if (user) {
        // Use the AuthService login method to update localStorage and observables
        this.authService.login(user);
        this.successMessage = 'Login successful! Redirecting...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['']), 1500);
    }
    
      } else {
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
    }
  }
  
}
