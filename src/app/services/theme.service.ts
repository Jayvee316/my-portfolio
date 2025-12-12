import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to store current theme ('light' or 'dark')
  // Signals are Angular's new way to manage reactive state
  isDarkMode = signal(false);

  constructor() {
    // Load saved theme from browser storage when app starts
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }

    // Effect runs whenever isDarkMode changes
    // This automatically saves to localStorage and updates CSS
    effect(() => {
      const theme = this.isDarkMode() ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.body.setAttribute('data-theme', theme);
    });
  }

  // Method to toggle between light and dark
  toggleTheme() {
    this.isDarkMode.update(current => !current);
  }
}