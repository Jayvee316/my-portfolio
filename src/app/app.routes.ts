import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
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
    path: 'blog',
    loadComponent: () =>
      import('./components/blog/blog').then((m) => m.Blog),
  },
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
  {
    path: 'repo/:name',
    loadComponent: () =>
      import('./components/repo-detail/repo-detail').then((m) => m.RepoDetail),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
