import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';  // ← ADD THIS
import { GitHubService, GitHubRepo } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-github-repos',
  imports: [FormsModule, RouterLink],
  templateUrl: './github-repos.html',
  styleUrl: './github-repos.scss'
})
export class GithubRepos implements OnInit {
  private githubService = inject(GitHubService);
  private loadingService = inject(LoadingService);
  
  // REPLACE WITH YOUR GITHUB USERNAME
  username = 'Jayvee316';
  
  allRepos = signal<GitHubRepo[]>([]);
  searchTerm = signal('');
  sortBy = signal<'updated' | 'stars' | 'name'>('updated');
  error = signal('');
  
  // Computed: Filter and sort repos
  filteredRepos = computed(() => {
    let repos = [...this.allRepos()];
    
    // Filter by search term
    const term = this.searchTerm().toLowerCase();
    if (term) {
      repos = repos.filter(repo => 
        repo.name.toLowerCase().includes(term) ||
        repo.description?.toLowerCase().includes(term) ||
        repo.language?.toLowerCase().includes(term)
      );
    }
    
    // Sort repos
    switch (this.sortBy()) {
      case 'stars':
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'name':
        repos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updated':
      default:
        repos.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }
    
    return repos;
  });
  
  // Stats computed from repos
  totalStars = computed(() => 
    this.allRepos().reduce((sum, repo) => sum + repo.stargazers_count, 0)
  );
  
  totalForks = computed(() => 
    this.allRepos().reduce((sum, repo) => sum + repo.forks_count, 0)
  );
  
  languages = computed(() => {
    const langs = new Set<string>();
    this.allRepos().forEach(repo => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs);
  });
  
  ngOnInit() {
    this.loadRepos();
  }
  
  loadRepos() {
    this.loadingService.show();
    this.error.set('');
    
    this.githubService.getUserRepos(this.username).subscribe({
      next: (data) => {
        this.allRepos.set(data);
        this.loadingService.hide();
      },
      error: (err) => {
        this.error.set('Failed to load repositories');
        this.loadingService.hide();
        console.error(err);
      }
    });
  }
  
  clearSearch() {
    this.searchTerm.set('');
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  
  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#ffac45',
      'Kotlin': '#A97BFF',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Vue': '#41b883',
      'React': '#61dafb'
    };
    return colors[language] || '#858585';
  }
}