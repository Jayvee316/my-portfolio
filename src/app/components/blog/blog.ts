import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Blog implements OnInit {
  private apiService = inject(ApiService);
  private loadingService = inject(LoadingService);
  private errorService = inject(ErrorService);

  // Signals for state management
  posts = signal<Post[]>([]);
  error = signal<string>('');
  selectedPost = signal<Post | null>(null);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loadingService.show();
    this.error.set('');

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data.slice(0, 10));
        this.loadingService.hide();
      },
      error: (err) => {
        this.error.set(this.errorService.getErrorMessage(err));
        this.loadingService.hide();
      }
    });
  }
  
  viewPost(post: Post) {
    this.selectedPost.set(post);
  }
  
  closePost() {
    this.selectedPost.set(null);
  }
}