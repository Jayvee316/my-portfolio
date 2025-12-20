import { Injectable, signal } from '@angular/core';

/**
 * LoadingService - Global loading state management
 *
 * This service provides a centralized way to show/hide loading indicators
 * across the application.
 *
 * AUTOMATIC (Recommended):
 * The loadingInterceptor automatically shows/hides the spinner for ALL HTTP
 * requests. No manual code needed - just make HTTP calls and the spinner appears!
 *
 * To skip the spinner for specific requests, add a header:
 *   this.http.get(url, { headers: { 'X-Skip-Loading': 'true' } })
 *
 * MANUAL (For non-HTTP operations):
 * For operations that don't use HttpClient (localStorage, computations, etc.):
 *   this.loadingService.show();
 *   // ... do work ...
 *   this.loadingService.hide();
 *
 * Usage in templates:
 *   @if (loadingService.isLoading()) { <app-loading-spinner /> }
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  /** Reactive signal that tracks loading state - true when loading, false otherwise */
  isLoading = signal(false);

  show() {
    this.isLoading.set(true);
  }

  hide() {
    this.isLoading.set(false);
  }

  /** Helper method for testing - simulates an async operation with configurable delay */
  async simulateLoading(duration: number = 2000) {
    this.show();
    await new Promise(resolve => setTimeout(resolve, duration));
    this.hide();
  }
}