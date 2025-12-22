import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

/**
 * ApiService - REST API integration with backend
 *
 * Connects to the ASP.NET Core backend API for:
 * - GET (fetch data)
 * - POST (create data)
 * - PUT (update data)
 * - DELETE (remove data)
 *
 * Usage:
 *   posts = signal<Post[]>([]);
 *   this.apiService.getPosts().subscribe(data => this.posts.set(data));
 */

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
  role: string;
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
  private baseUrl = environment.apiUrl;

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'User')
      )
    );
  }

  /** Returns first 10 todos using RxJS map() to transform the response */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`).pipe(
      map((todos) => todos.slice(0, 10)),
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Todo')
      )
    );
  }

  /** Simulated POST - returns fake response with generated ID */
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Post')
      )
    );
  }
}
