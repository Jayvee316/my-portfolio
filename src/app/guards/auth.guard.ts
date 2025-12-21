import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * authGuard - Protects routes that require authentication
 *
 * This is a functional guard (Angular 15+). It runs before a route is activated
 * and can allow or deny access based on conditions.
 *
 * How it works:
 * 1. User tries to navigate to a protected route (e.g., /dashboard)
 * 2. Angular runs this guard before loading the component
 * 3. If guard returns true → route loads normally
 * 4. If guard returns false or UrlTree → access denied, redirect occurs
 *
 * Usage in routes:
 *   {
 *     path: 'dashboard',
 *     loadComponent: () => import('./dashboard'),
 *     canActivate: [authGuard]  // ← Add guard here
 *   }
 *
 * Guard Types Available:
 * - canActivate: Can the user navigate TO this route?
 * - canActivateChild: Can the user access CHILD routes?
 * - canDeactivate: Can the user navigate AWAY from this route?
 * - canMatch: Should this route even be considered for matching?
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (authService.isLoggedIn()) {
    // User is authenticated - allow access
    return true;
  }

  // User is NOT authenticated - redirect to login page
  // Store the attempted URL for redirecting after login
  console.log('Access denied! Redirecting to login...');
  console.log('Attempted URL:', state.url);

  // Return a UrlTree to redirect (better than router.navigate in guards)
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

/**
 * adminGuard - Protects routes that require admin role
 *
 * Example of a role-based guard.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.hasRole('admin')) {
    return true;
  }

  // Not an admin - redirect to dashboard or show unauthorized
  if (authService.isLoggedIn()) {
    // Logged in but not admin
    console.log('Admin access required!');
    return router.createUrlTree(['/dashboard']);
  }

  // Not logged in at all
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
