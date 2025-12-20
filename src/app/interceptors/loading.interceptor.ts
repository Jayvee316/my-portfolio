import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * Active request counter - tracks concurrent HTTP requests
 * Only hides spinner when ALL requests complete
 */
let activeRequests = 0;

/**
 * LoadingInterceptor - Automatically shows/hides loading spinner for HTTP requests
 *
 * This is a functional interceptor (Angular 15+) that:
 * - Shows the loading spinner when any HTTP request starts
 * - Hides the spinner only when ALL concurrent requests complete
 * - Works automatically for all HttpClient calls
 *
 * Benefits:
 * - No need to manually call loadingService.show()/hide() in components
 * - Consistent loading behavior across the entire app
 * - Handles concurrent requests correctly
 *
 * Usage: Register in app.config.ts with provideHttpClient(withInterceptors([loadingInterceptor]))
 *
 * Optional: Skip loading spinner for specific requests by adding a custom header:
 *   this.http.get(url, { headers: { 'X-Skip-Loading': 'true' } })
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Check if this request should skip the loading spinner
  const skipLoading = req.headers.has('X-Skip-Loading');

  if (skipLoading) {
    // Remove the custom header before sending (backend doesn't need it)
    const cleanReq = req.clone({
      headers: req.headers.delete('X-Skip-Loading')
    });
    return next(cleanReq);
  }

  // Increment counter and show spinner
  activeRequests++;
  if (activeRequests === 1) {
    // Only show on first request (avoid multiple show() calls)
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      // Decrement counter when request completes (success or error)
      activeRequests--;
      if (activeRequests === 0) {
        // Only hide when all requests are done
        loadingService.hide();
      }
    })
  );
};
