import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * AuthService - JWT authentication with backend API
 *
 * Features:
 * - Login/Register via backend API
 * - JWT token storage in localStorage
 * - Auto-load user on app startup
 * - Role-based access control
 *
 * Used by:
 * - authGuard: To check if user can access protected routes
 * - Components: To show/hide login/logout buttons
 * - Header: To display user info
 * - authInterceptor: To add JWT token to requests
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  // User state
  private currentUser = signal<User | null>(null);
  private token = signal<string | null>(null);

  // Computed signals for easy access in templates
  isLoggedIn = computed(() => this.currentUser() !== null);
  user = computed(() => this.currentUser());
  username = computed(() => this.currentUser()?.name ?? 'Guest');

  constructor() {
    // Load token and user from localStorage on app startup
    this.loadFromStorage();
  }

  /**
   * Login with backend API
   */
  login(username: string, password: string): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        this.setSession(response);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  /**
   * Register new user with backend API
   */
  register(name: string, email: string, password: string): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password
    }).pipe(
      tap(response => {
        this.setSession(response);
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }

  /**
   * Log out - clear tokens and redirect
   */
  logout(): void {
    this.currentUser.set(null);
    this.token.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.router.navigate(['/about']);
  }

  /**
   * Get current JWT token for HTTP requests
   */
  getToken(): string | null {
    return this.token();
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  /**
   * Store session data after successful login/register
   */
  private setSession(response: LoginResponse): void {
    this.token.set(response.token);
    this.currentUser.set(response.user);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
  }

  /**
   * Load session from localStorage on app startup
   */
  private loadFromStorage(): void {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.token.set(storedToken);
        this.currentUser.set(user);
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  }
}

/**
 * User interface - represents authenticated user
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

/**
 * Login/Register response from backend
 */
export interface LoginResponse {
  token: string;
  user: User;
}
