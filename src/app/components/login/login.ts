import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Login - Login page with backend authentication
 *
 * Authenticates users against the ASP.NET Core backend API.
 * Uses JWT tokens for authentication.
 *
 * Features:
 * - Redirects to returnUrl after successful login (if came from protected route)
 * - Shows error message on failed login
 * - Redirects to dashboard if already logged in
 *
 * Test Credentials (seeded in database):
 * - admin@example.com / admin123 (admin role)
 * - john@example.com / password123 (user role)
 * - jane@example.com / password123 (user role)
 */
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="login-section">
      <div class="login-card">
        <h2>Login</h2>
        <p class="subtitle">Demo login for Route Guard example</p>

        @if (authService.isLoggedIn()) {
          <div class="already-logged-in">
            <p>You're already logged in as <strong>{{ authService.username() }}</strong></p>
            <button class="btn btn-primary" (click)="goToDashboard()">
              Go to Dashboard
            </button>
            <button class="btn btn-secondary" (click)="authService.logout()">
              Logout
            </button>
          </div>
        } @else {
          @if (errorMessage()) {
            <div class="error-alert" role="alert">
              {{ errorMessage() }}
            </div>
          }

          <form (ngSubmit)="onLogin()">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                [(ngModel)]="username"
                name="username"
                placeholder="Enter any username"
                required>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                [(ngModel)]="password"
                name="password"
                placeholder="Enter any password"
                required>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Login
            </button>
          </form>

          <div class="demo-note">
            <p><strong>Test Credentials:</strong></p>
            <p><code>admin@example.com</code> / <code>admin123</code> (admin)</p>
            <p><code>john@example.com</code> / <code>password123</code> (user)</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .login-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .login-card {
      background: var(--card-bg);
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px var(--shadow);
      width: 100%;
      max-width: 400px;

      h2 {
        margin: 0 0 0.5rem;
        color: var(--text-color);
        text-align: center;
      }

      .subtitle {
        color: #7f8c8d;
        text-align: center;
        margin-bottom: 2rem;
      }
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        background: var(--card-bg);
        color: var(--text-color);

        &:focus {
          outline: none;
          border-color: #3498db;
        }
      }
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;

      &.btn-primary {
        background: #3498db;
        color: white;

        &:hover {
          background: #2980b9;
        }
      }

      &.btn-secondary {
        background: #95a5a6;
        color: white;
        margin-left: 0.5rem;

        &:hover {
          background: #7f8c8d;
        }
      }

      &.btn-block {
        width: 100%;
      }
    }

    .error-alert {
      background: #fee;
      color: #c33;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #e74c3c;
    }

    .already-logged-in {
      text-align: center;

      p {
        margin-bottom: 1.5rem;
        color: var(--text-color);
      }
    }

    .demo-note {
      margin-top: 2rem;
      padding: 1rem;
      background: #e8f4fd;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #2980b9;

      p {
        margin: 0.25rem 0;
      }

      code {
        background: #d5e9f7;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
      }
    }

    [data-theme="dark"] .demo-note {
      background: #1a3a4a;
      color: #7ec8e3;

      code {
        background: #0d2836;
      }
    }
  `]
})
export class Login {
  authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  errorMessage = signal('');
  isLoading = signal(false);

  onLogin() {
    this.errorMessage.set('');

    if (!this.username || !this.password) {
      this.errorMessage.set('Please enter username and password');
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response) {
          // Check if there's a return URL (came from protected route)
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.errorMessage.set('Invalid username or password');
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Login failed. Please try again.');
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
