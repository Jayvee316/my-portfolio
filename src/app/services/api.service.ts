import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { ErrorService } from './error.service';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);

  // JSONPlaceholder API - Free fake REST API for testing
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  // Get single post
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'User')
      )
    );
  }

  // Get todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`).pipe(
      map((todos) => todos.slice(0, 10)), // Get only first 10
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Todo')
      )
    );
  }

  // Create new post (simulated - API returns fake response)
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  // Update post
  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  // Delete post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }
}
