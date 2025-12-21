import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

/**
 * Dashboard - Protected page that requires authentication
 *
 * This page can only be accessed if the user is logged in.
 * The authGuard protects this route and redirects to /login if not authenticated.
 *
 * Demonstrates:
 * - Protected route with canActivate guard
 * - Displaying user information from AuthService
 * - Role-based content (admin vs regular user)
 */
@Component({
  selector: 'app-dashboard',
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="dashboard-section">
      <div class="dashboard-header">
        <h2>Dashboard</h2>
        <p class="subtitle">Welcome, <strong>{{ authService.username() }}</strong>!</p>
      </div>

      <div class="dashboard-grid">
        <!-- User Info Card -->
        <div class="card user-card">
          <div class="card-header">
            <span class="card-icon">👤</span>
            <h3>Your Profile</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">{{ authService.user()?.name }}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{ authService.user()?.email }}</span>
            </div>
            <div class="info-row">
              <span class="label">Role:</span>
              <span class="value role-badge" [class.admin]="authService.hasRole('admin')">
                {{ authService.user()?.role | uppercase }}
              </span>
            </div>
          </div>
        </div>

        <!-- Protected Content Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">🔒</span>
            <h3>Protected Content</h3>
          </div>
          <div class="card-body">
            <p>This content is only visible to authenticated users.</p>
            <p>The <code>authGuard</code> prevents unauthorized access to this page.</p>
          </div>
        </div>

        <!-- Route Guard Info -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">🛡️</span>
            <h3>How Route Guards Work</h3>
          </div>
          <div class="card-body">
            <ol class="steps">
              <li>User navigates to <code>/dashboard</code></li>
              <li>Angular runs <code>authGuard</code> before loading</li>
              <li>Guard checks <code>authService.isLoggedIn()</code></li>
              <li>If true → Page loads normally</li>
              <li>If false → Redirect to <code>/login</code></li>
            </ol>
          </div>
        </div>

        <!-- Admin Only Section -->
        @if (authService.hasRole('admin')) {
          <div class="card admin-card">
            <div class="card-header">
              <span class="card-icon">⚡</span>
              <h3>Admin Panel</h3>
            </div>
            <div class="card-body">
              <p>This section is only visible to admin users!</p>
              <p>You logged in with username <code>admin</code>.</p>
              <div class="admin-stats">
                <div class="stat">
                  <span class="stat-value">42</span>
                  <span class="stat-label">Total Users</span>
                </div>
                <div class="stat">
                  <span class="stat-value">128</span>
                  <span class="stat-label">Page Views</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Logout Button -->
      <div class="actions">
        <button class="btn btn-logout" (click)="authService.logout()">
          Logout
        </button>
      </div>
    </section>
  `,
  styles: [`
    .dashboard-section {
      padding: 2rem 0;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;

      h2 {
        color: var(--text-color);
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #7f8c8d;
        font-size: 1.2rem;
      }
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 4px 15px var(--shadow);
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .card-icon {
        font-size: 1.5rem;
      }

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }

    .card-body {
      padding: 1.5rem;
      color: var(--text-color);

      p {
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      code {
        background: #e8f4fd;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
        color: #2980b9;
      }
    }

    [data-theme="dark"] .card-body code {
      background: #1a3a4a;
      color: #7ec8e3;
    }

    .user-card .card-header {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #7f8c8d;
      }

      .value {
        font-weight: 500;
      }
    }

    [data-theme="dark"] .info-row {
      border-bottom-color: #444;
    }

    .role-badge {
      background: #3498db;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;

      &.admin {
        background: #e74c3c;
      }
    }

    .steps {
      margin: 0;
      padding-left: 1.5rem;

      li {
        margin: 0.75rem 0;
        line-height: 1.6;
      }
    }

    .admin-card .card-header {
      background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
    }

    .admin-stats {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;

      .stat {
        text-align: center;

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #e74c3c;
        }

        .stat-label {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
      }
    }

    .actions {
      text-align: center;
      margin-top: 2rem;
    }

    .btn-logout {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #c0392b;
      }
    }
  `]
})
export class Dashboard {
  authService = inject(AuthService);
}
