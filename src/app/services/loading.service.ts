import { Injectable, signal } from '@angular/core';

/**
 * LoadingService - Global loading state management
 *
 * This service provides a centralized way to show/hide loading indicators
 * across the application. Components can inject this service to:
 * - Show a loading spinner during API calls
 * - Disable form submissions while processing
 * - Display loading overlays for async operations
 *
 * Usage in components:
 *   loadingService = inject(LoadingService);
 *   this.loadingService.show();  // Before API call
 *   this.loadingService.hide();  // After API call completes
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