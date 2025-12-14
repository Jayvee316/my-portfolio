import { Component, signal, inject, OnInit } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {
  private apiService = inject(ApiService);
  private loadingService = inject(LoadingService);
  
  // Signals for state management
  posts = signal<Post[]>([]);
  error = signal<string>('');
  selectedPost = signal<Post | null>(null);
  
  ngOnInit() {
    this.loadPosts();
  }
  
  async loadPosts() {
    try {
      this.loadingService.show();
      this.error.set('');
      
      // Subscribe to Observable to get data
      this.apiService.getPosts().subscribe({
        next: (data) => {
          // Success - update signal with data
          this.posts.set(data.slice(0, 10)); // Get first 10 posts
          this.loadingService.hide();
        },
        error: (err) => {
          // Error - show message
          this.error.set('Failed to load posts. Please try again.');
          this.loadingService.hide();
          console.error('Error loading posts:', err);
        }
      });
    } catch (err) {
      this.error.set('An unexpected error occurred');
      this.loadingService.hide();
    }
  }
  
  viewPost(post: Post) {
    this.selectedPost.set(post);
  }
  
  closePost() {
    this.selectedPost.set(null);
  }
}