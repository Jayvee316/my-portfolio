import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spinner-overlay">
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="spinner-ring"></div>
        <p class="loading-text">Loading<span class="dots"></span></p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .spinner-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .spinner {
      width: 60px;
      height: 60px;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3498db;
      border-radius: 50%;
      animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      position: relative;
      z-index: 2;
    }
    
    .spinner-ring {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 3px solid transparent;
      border-top: 3px solid #2ecc71;
      border-radius: 50%;
      animation: spin 2s linear infinite reverse;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-text {
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
    
    .dots::after {
      content: '';
      animation: dots 1.5s steps(4, end) infinite;
    }
    
    @keyframes dots {
      0%, 20% { content: ''; }
      40% { content: '.'; }
      60% { content: '..'; }
      80%, 100% { content: '...'; }
    }
    
    // Mobile adjustments
    @media (max-width: 768px) {
      .spinner {
        width: 50px;
        height: 50px;
      }
      
      .spinner-ring {
        width: 70px;
        height: 70px;
      }
      
      .loading-text {
        font-size: 1rem;
      }
    }
  `]
})
export class LoadingSpinner {}