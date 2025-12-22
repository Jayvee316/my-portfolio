import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

/**
 * Auth Interceptor - Adds JWT token to HTTP requests
 *
 * This interceptor automatically adds the Authorization header
 * with the Bearer token to outgoing HTTP requests to the backend API
 * when the user is authenticated.
 *
 * Skips adding the header for:
 * - Requests to external APIs (GitHub, etc.)
 * - Login/Register requests (they don't need a token)
 * - Requests when user is not authenticated
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Only add token to requests going to our backend API
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  // Skip if no token, not our API, or auth endpoints
  if (!token || !isApiRequest || req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  // Clone the request and add the Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
