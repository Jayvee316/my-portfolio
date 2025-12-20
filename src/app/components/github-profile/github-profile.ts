import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GitHubService, GitHubUser } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-github-profile',
  imports: [],
  templateUrl: './github-profile.html',
  styleUrl: './github-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubProfile implements OnInit {
  private githubService = inject(GitHubService);
  private loadingService = inject(LoadingService);
  private errorService = inject(ErrorService);

  // REPLACE WITH YOUR GITHUB USERNAME
  username = 'Jayvee316';

  profile = signal<GitHubUser | null>(null);
  error = signal('');

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loadingService.show();
    this.error.set('');

    this.githubService.getUserProfile(this.username).subscribe({
      next: (data) => {
        this.profile.set(data);
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
      month: 'long' 
    });
  }
}