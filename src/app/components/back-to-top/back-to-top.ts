import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

/**
 * BackToTop - Floating scroll-to-top button
 *
 * Appears after scrolling down 300px and smoothly scrolls to top when clicked.
 * Includes accessibility features: proper ARIA label and focus management.
 */
@Component({
  selector: 'app-back-to-top',
  imports: [],
  host: {
    '(window:scroll)': 'onWindowScroll()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <button
        class="back-to-top"
        (click)="scrollToTop()"
        type="button"
        aria-label="Scroll to top of page">
        ↑
      </button>
    }
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: background 0.3s, transform 0.3s;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in;
      
      &:hover {
        background: #2980b9;
        transform: translateY(-5px);
      }
      
      &:active {
        transform: translateY(-2px);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 768px) {
      .back-to-top {
        bottom: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
      }
    }
  `]
})
export class BackToTop {
  isVisible = signal(false);
  
  onWindowScroll() {
    // Show button after scrolling 300px from top
    const scrollPosition = window.pageYOffset || 
                          document.documentElement.scrollTop || 
                          document.body.scrollTop || 0;
    
    this.isVisible.set(scrollPosition > 300);
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // After scroll completes, focus the main heading for accessibility
    // This helps screen reader users know they're at the top
    setTimeout(() => {
      const mainHeading = document.querySelector('h1, [role="main"] h2, main h2');
      if (mainHeading instanceof HTMLElement) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus();
        // Remove tabindex after focus to keep natural tab order
        mainHeading.addEventListener('blur', () => {
          mainHeading.removeAttribute('tabindex');
        }, { once: true });
      }
    }, 500); // Wait for smooth scroll to complete
  }
}