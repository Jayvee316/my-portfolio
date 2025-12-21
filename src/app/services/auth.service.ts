import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

/**
 * AuthService - Simple authentication state management
 *
 * This is a DEMO service that simulates authentication.
 * In a real app, you would:
 * - Call a backend API to verify credentials
 * - Store JWT tokens in localStorage/sessionStorage
 * - Handle token refresh
 *
 * Used by:
 * - authGuard: To check if user can access protected routes
 * - Components: To show/hide login/logout buttons
 * - Header: To display user info
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulated user state - in real app, this would come from API/token
  private currentUser = signal<User | null>(null);

  // Computed signals for easy access in templates
  isLoggedIn = computed(() => this.currentUser() !== null);
  user = computed(() => this.currentUser());
  username = computed(() => this.currentUser()?.name ?? 'Guest');

  constructor(private router: Router) {
    // Check localStorage for existing session on app load
    this.loadUserFromStorage();
  }

  /**
   * Simulate login - In real app, this would call an API
   */
  login(username: string, password: string): boolean {
    // Demo: Accept any non-empty username/password
    if (username && password) {
      const user: User = {
        id: 1,
        name: username,
        email: `${username.toLowerCase()}@example.com`,
        role: username.toLowerCase() === 'admin' ? 'admin' : 'user'
      };

      this.currentUser.set(user);
      localStorage.setItem('demo_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  /**
   * Log out and redirect to home
   */
  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('demo_user');
    this.router.navigate(['/about']);
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  /**
   * Load user from localStorage (persist session across page refresh)
   */
  private loadUserFromStorage(): void {
    const stored = localStorage.getItem('demo_user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        this.currentUser.set(user);
      } catch {
        localStorage.removeItem('demo_user');
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
