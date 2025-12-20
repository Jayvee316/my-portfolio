import { Injectable, signal, effect } from '@angular/core';

/**
 * ThemeService - Dark/Light mode management
 *
 * Handles theme switching with automatic persistence to localStorage.
 * Uses Angular signals for reactive state and effects for side effects.
 *
 * How it works:
 * 1. On app load, checks localStorage for saved theme preference
 * 2. When theme changes, effect() automatically:
 *    - Saves preference to localStorage
 *    - Updates data-theme attribute on <body> for CSS styling
 *
 * CSS Integration:
 *   Styles should use CSS variables that change based on [data-theme]:
 *   body { --bg-color: white; }
 *   body[data-theme="dark"] { --bg-color: #1a1a1a; }
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    // Restore user's theme preference from previous session
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }

    // effect() automatically re-runs when isDarkMode signal changes
    // This keeps localStorage and DOM in sync with the signal
    effect(() => {
      const theme = this.isDarkMode() ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.body.setAttribute('data-theme', theme);
    });
  }

  toggleTheme() {
    this.isDarkMode.update(current => !current);
  }
}