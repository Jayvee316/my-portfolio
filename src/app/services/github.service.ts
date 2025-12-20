import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';

/**
 * GitHubService - GitHub REST API integration
 *
 * Fetches public GitHub data including user profiles, repositories,
 * commits, and language statistics using the GitHub REST API v3.
 *
 * Rate Limiting:
 * - Without token: 60 requests/hour (per IP)
 * - With token: 5,000 requests/hour
 *
 * To increase rate limit, add a Personal Access Token:
 * 1. Go to https://github.com/settings/tokens
 * 2. Generate a token with 'public_repo' scope
 * 3. Add it to environment.ts: github: { token: 'ghp_xxx' }
 *
 * API Documentation: https://docs.github.com/en/rest
 */

/** GitHub user profile data structure */
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

/** Repository information from GitHub API */
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

/** Commit data with author and message */
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

/** Language breakdown - key is language name, value is bytes of code */
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

  // Add token here for higher rate limits (see class documentation above)
  private token = '';

  /** Builds HTTP headers, adding Authorization if token is configured */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `token ${this.token}`);
    }
    return headers;
  }

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

  /** Fetches all repos for a user, sorted by most recently updated */
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

  /** Returns language breakdown with byte counts (e.g., { TypeScript: 15000, HTML: 3000 }) */
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

  /** Search GitHub repositories globally by query string */
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
