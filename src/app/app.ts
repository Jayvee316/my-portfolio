import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { BackToTop } from './components/back-to-top/back-to-top';
import { LoadingService } from './services/loading.service';

/**
 * App - Root component of the application
 *
 * This is the entry point that Angular bootstraps. It provides:
 * - Header: Navigation menu (always visible)
 * - RouterOutlet: Where page components are rendered based on URL
 * - LoadingSpinner: Global loading indicator
 * - BackToTop: Floating button to scroll to top
 *
 * The app uses standalone components (Angular 14+) - no NgModule needed.
 * Components are imported directly in the @Component decorator.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoadingSpinner, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  title = 'my-portfolio';

  // Public so template can access loadingService.isLoading()
  loadingService = inject(LoadingService);
}