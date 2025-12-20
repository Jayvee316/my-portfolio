import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubService, GitHubRepo, GitHubCommit, GitHubLanguages } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { ErrorService } from '../../services/error.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-repo-detail',
  imports: [],
  templateUrl: './repo-detail.html',
  styleUrl: './repo-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoDetail implements OnInit {
  private githubService = inject(GitHubService);
  private loadingService = inject(LoadingService);
  private errorService = inject(ErrorService);
  private route = inject(ActivatedRoute);

  // REPLACE WITH YOUR GITHUB USERNAME
  username = 'Jayvee316';
  repoName = signal('');
  
  repo = signal<GitHubRepo | null>(null);
  commits = signal<GitHubCommit[]>([]);
  languages = signal<GitHubLanguages>({});
  error = signal('');
  
  // Computed: Language percentages
  languageStats = computed(() => {
    const langs = this.languages();
    const total = Object.values(langs).reduce((sum, bytes) => sum + bytes, 0);
    
    return Object.entries(langs)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: ((bytes / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.bytes - a.bytes);
  });
  
  ngOnInit() {
    // Get repo name from URL
    this.repoName.set(this.route.snapshot.paramMap.get('name') || '');
    if (this.repoName()) {
      this.loadRepoDetails();
    }
  }
  
  loadRepoDetails() {
    this.loadingService.show();
    this.error.set('');

    // Load repo, commits, and languages in parallel
    forkJoin({
      repo: this.githubService.getRepo(this.username, this.repoName()),
      commits: this.githubService.getRepoCommits(this.username, this.repoName(), 10),
      languages: this.githubService.getRepoLanguages(this.username, this.repoName())
    }).subscribe({
      next: (data) => {
        this.repo.set(data.repo);
        this.commits.set(data.commits);
        this.languages.set(data.languages);
        this.loadingService.hide();
      },
      error: (err) => {
        this.error.set(this.errorService.getErrorMessage(err));
        this.loadingService.hide();
      }
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  
  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'HTML': '#e34c26',
      'CSS': '#563d7c'
    };
    return colors[language] || '#858585';
  }
}