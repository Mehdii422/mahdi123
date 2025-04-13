import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Base interface with shared fields
export interface BaseUser {
  id: number;
  type: 'Etudiant' | 'jobseeker' | 'entrepreneur' | 'admin';
  email: string;
  password: string;
}

// Specific interfaces for each type
export interface Etudiant extends BaseUser {
  type: 'Etudiant';
  username: string;
  firstName: string;
  birthdate: string;
  phone: string;
  address: string;
  scheduleOption: 'fill' | 'import';
  studyLevel: string;
  section?: string;
  degree?: string;
  // Other fields as needed…
}

export interface JobSeeker extends BaseUser {
  type: 'jobseeker';
  formation: string;
  experience: string;
  // Possibly a cvUpload field (handled as file or URL string)
}

export interface Entrepreneur extends BaseUser {
  type: 'entrepreneur';
  societyName: string;
  domain: string;
  numberOfWorkers: number;
  additionalInfo: string;
}

export interface Admin extends BaseUser {
  type: 'admin';
  adminCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userName = new BehaviorSubject<string>('');

  isLoggedIn$ = this.loggedIn.asObservable();
  currentUserName$ = this.userName.asObservable();

  private currentId = 1;

  // A collection of at least two accounts for each user type.
  private users: BaseUser[] = [
    {
      id: 0,
      type: 'entrepreneur',
      email: 'chefk@example.com',
      password: '123',
      societyName: 'Tech Innovators',
      domain: 'Technology',
      numberOfWorkers: 10,
      additionalInfo: 'Startup in AI'
    } as Entrepreneur,
    {
      id: 1,
      type: 'entrepreneur',
      email: 'ingm@example.com',
      password: '123',
      societyName: 'Tech Innovators',
      domain: 'Technology',
      numberOfWorkers: 10,
      additionalInfo: 'Startup in AI'
    } as Entrepreneur,
    {
      id: 2,
      type: 'entrepreneur',
      email: 'drmed@example.com',
      password: '123',
      societyName: 'Tech Innovators',
      domain: 'Technology',
      numberOfWorkers: 10,
      additionalInfo: 'Startup in AI'
    } as Entrepreneur,
    // Etudiant accounts
    {
      id: this.currentId++,
      type: 'Etudiant',
      email: 'etudiant1@example.com',
      password: '123',
      username: 'Etud1',
      firstName: 'Alice',
      birthdate: '2000-01-01',
      phone: '1234567890',
      address: 'Address 1',
      scheduleOption: 'fill',
      studyLevel: 'lycee',
      section: 'math',
      degree: ''
    } as Etudiant,
    {
      id: this.currentId++,
      type: 'Etudiant',
      email: 'etudiant2@example.com',
      password: '123',
      username: 'Etud2',
      firstName: 'Bob',
      birthdate: '2000-02-02',
      phone: '0987654321',
      address: 'Address 2',
      scheduleOption: 'import',
      studyLevel: 'higher',
      section: '',
      degree: 'master'
    } as Etudiant,

    // Job Seeker accounts
    {
      id: this.currentId++,
      type: 'jobseeker',
      email: 'jobseeker1@example.com',
      password: '123',
      formation: 'Bachelor in Business',
      experience: '2 years in marketing'
    } as JobSeeker,
    {
      id: this.currentId++,
      type: 'jobseeker',
      email: 'jobseeker2@example.com',
      password: '123',
      formation: 'Diploma in IT',
      experience: '1 year in development'
    } as JobSeeker,

    // Entrepreneur accounts
    {
      id: this.currentId++,
      type: 'entrepreneur',
      email: 'entrepreneur1@example.com',
      password: '123',
      societyName: 'Tech Innovators',
      domain: 'Technology',
      numberOfWorkers: 10,
      additionalInfo: 'Startup in AI'
    } as Entrepreneur,
    {
      id: this.currentId++,
      type: 'entrepreneur',
      email: 'entrepreneur2@example.com',
      password: '123',
      societyName: 'Finance Pros',
      domain: 'Finance',
      numberOfWorkers: 20,
      additionalInfo: 'Consultancy firm'
    } as Entrepreneur,

    // Admin accounts
    {
      id: this.currentId++,
      type: 'admin',
      email: 'admin1@example.com',
      password: '123',
      adminCode: 'ADMIN01'
    } as Admin,
    {
      id: this.currentId++,
      type: 'admin',
      email: 'admin2@example.com',
      password: '123',
      adminCode: 'ADMIN02'
    } as Admin
  ];

  private hasToken(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.userName.next(parsed.firstName || parsed.email);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  login(user: any): void {
    if (!user.id) {
      user.id = Date.now(); // Generate unique numeric ID
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn.next(true);
    this.userName.next(user.firstName || user.email);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.userName.next('');
  }

  /**
   * Validates that the provided email and password belong to one of the stored users.
   * Returns the corresponding user (as BaseUser) if valid; otherwise, returns null.
   */
  validateCredentials(email: string, password: string): BaseUser | null {
    return this.users.find(user => user.email === email && user.password === password) || null;
  }

  registerUser(newUser: Omit<BaseUser, 'id'>): BaseUser {
    const userWithId: BaseUser = { ...newUser, id: this.currentId++ };
    this.users.push(userWithId);
    console.log('New user registered:', userWithId);
    return userWithId;
  }

  // Optionally, create a getter to inspect users (for debugging)
  getAllUsers(): BaseUser[] {
    return this.users;
  }
}
