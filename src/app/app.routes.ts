import { Routes } from '@angular/router';

/**
 * Application Routes Configuration
 *
 * Uses lazy loading (loadComponent) for better performance:
 * - Components are only loaded when the user navigates to them
 * - Reduces initial bundle size and speeds up app startup
 *
 * Route Structure:
 * - /about         - About me page (default route)
 * - /projects      - Portfolio projects showcase
 * - /skills        - Technical skills display
 * - /contact       - Basic contact form
 * - /contact-advanced - Advanced contact form with more features
 * - /blog          - Blog posts (demo using JSONPlaceholder API)
 * - /github-profile - GitHub profile integration
 * - /github-repos  - GitHub repositories list
 * - /repo/:name    - Individual repository details (dynamic route)
 * - /**            - 404 Not Found (wildcard - must be last)
 */
export const routes: Routes = [
  // Redirect root to about page
  { path: '', redirectTo: '/about', pathMatch: 'full' },

  // Main pages
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about').then((m) => m.About),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./components/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./components/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'contact-advanced',
    loadComponent: () =>
      import('./components/contact-advanced/contact-advanced').then((m) => m.ContactAdvanced),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./components/blog/blog').then((m) => m.Blog),
  },

  // GitHub integration pages
  {
    path: 'github-profile',
    loadComponent: () =>
      import('./components/github-profile/github-profile').then(
        (m) => m.GithubProfile
      ),
  },
  {
    path: 'github-repos',
    loadComponent: () =>
      import('./components/github-repos/github-repos').then(
        (m) => m.GithubRepos
      ),
  },
  // Dynamic route - :name is a URL parameter (e.g., /repo/my-portfolio)
  {
    path: 'repo/:name',
    loadComponent: () =>
      import('./components/repo-detail/repo-detail').then((m) => m.RepoDetail),
  },

  // Wildcard route - catches all undefined routes (must be last!)
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
