import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface BaseUser {
  id: number;
  type: 'Etudiant' | 'jobseeker' | 'entrepreneur' | 'admin';
  email: string;
  password: string;
  firstName?: string; // Added optional firstName property
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userName = new BehaviorSubject<string>('');

  isLoggedIn$ = this.loggedIn.asObservable();
  currentUserName$ = this.userName.asObservable();

  constructor(private http: HttpClient) {}

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

  login(email: string, password: string) {
    return this.http.post<{ success: boolean; message: string; user?: BaseUser }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.loggedIn.next(true);
          this.userName.next(response.user.firstName || response.user.email);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.userName.next('');
  }

  registerUser(newUser: Omit<BaseUser, 'id'>) {
    return this.http.post<{ success: boolean; message: string; user?: BaseUser }>(`${this.apiUrl}/register`, newUser);
  }
}
