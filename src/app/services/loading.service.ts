import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal(false);
  
  show() {
    this.isLoading.set(true);
  }
  
  hide() {
    this.isLoading.set(false);
  }
  
  // Simulate API call (for testing)
  async simulateLoading(duration: number = 2000) {
    this.show();
    await new Promise(resolve => setTimeout(resolve, duration));
    this.hide();
  }
}