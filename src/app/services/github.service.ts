import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  size: number;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface GitHubLanguages {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);
  private baseUrl = 'https://api.github.com';

  // Optional: Add your GitHub Personal Access Token for higher rate limits (5000/hour)
  // Get token from: https://github.com/settings/tokens
  private token = ''; // Leave empty for public access or add 'ghp_xxxxx'

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `token ${this.token}`);
    }
    return headers;
  }

  // Get user profile
  getUserProfile(username: string): Observable<GitHubUser> {
    return this.http
      .get<GitHubUser>(`${this.baseUrl}/users/${username}`, {
        headers: this.getHeaders()
      })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }

  // Get all user repositories
  getUserRepos(username: string): Observable<GitHubRepo[]> {
    return this.http
      .get<GitHubRepo[]>(
        `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=100`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }

  // Get specific repository
  getRepo(username: string, repoName: string): Observable<GitHubRepo> {
    return this.http
      .get<GitHubRepo>(`${this.baseUrl}/repos/${username}/${repoName}`, {
        headers: this.getHeaders()
      })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }

  // Get repository languages
  getRepoLanguages(
    username: string,
    repoName: string
  ): Observable<GitHubLanguages> {
    return this.http
      .get<GitHubLanguages>(
        `${this.baseUrl}/repos/${username}/${repoName}/languages`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }

  // Get repository commits
  getRepoCommits(
    username: string,
    repoName: string,
    perPage: number = 10
  ): Observable<GitHubCommit[]> {
    return this.http
      .get<GitHubCommit[]>(
        `${this.baseUrl}/repos/${username}/${repoName}/commits?per_page=${perPage}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }

  // Search repositories
  searchRepos(query: string): Observable<{ items: GitHubRepo[] }> {
    return this.http
      .get<{ items: GitHubRepo[] }>(
        `${this.baseUrl}/search/repositories?q=${query}&sort=stars&order=desc`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleHttpError(error, 'GitHub')
        )
      );
  }
}
