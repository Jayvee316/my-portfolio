import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { loadingInterceptor, authInterceptor } from './interceptors';

/**
 * Application Configuration
 *
 * Configures providers for the entire application:
 * - Zone.js change detection with event coalescing for better performance
 * - Router with lazy-loaded routes
 * - HttpClient with interceptors:
 *   - authInterceptor: Adds JWT token to requests
 *   - loadingInterceptor: Shows spinner during HTTP requests
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // withInterceptors() registers functional interceptors for all HTTP requests
    // authInterceptor must come before loadingInterceptor
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor]))
  ]
};