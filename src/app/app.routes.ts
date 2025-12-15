import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Contact } from './components/contact/contact';
import { Blog } from './components/blog/blog';
import { GithubProfile } from './components/github-profile/github-profile';
import { GithubRepos} from './components/github-repos/github-repos';
import { RepoDetail } from './components/repo-detail/repo-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
  { path: 'blog', component: Blog },
  { path: 'github-profile', component: GithubProfile },
  { path: 'github-repos', component: GithubRepos },
  { path: 'repo/:name', component: RepoDetail }
];