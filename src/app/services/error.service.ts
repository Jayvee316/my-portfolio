import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface AppError {
  message: string;
  userMessage: string;
  statusCode?: number;
  type: ErrorType;
}

export enum ErrorType {
  Network = 'NETWORK',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  RateLimited = 'RATE_LIMITED',
  BadRequest = 'BAD_REQUEST',
  ServerError = 'SERVER_ERROR',
  Unknown = 'UNKNOWN'
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  /**
   * Handles HTTP errors and returns user-friendly error messages
   */
  handleHttpError(error: HttpErrorResponse, context?: string) {
    const appError = this.parseError(error, context);

    // Log for debugging (only in development)
    console.error(`[${context || 'API'}] Error:`, {
      status: error.status,
      message: error.message,
      type: appError.type
    });

    return throwError(() => appError);
  }

  /**
   * Parses HTTP errors into structured AppError objects
   */
  private parseError(error: HttpErrorResponse, context?: string): AppError {
    // Network error (no internet, CORS, etc.)
    if (error.status === 0) {
      return {
        message: error.message,
        userMessage: 'Unable to connect. Please check your internet connection and try again.',
        statusCode: 0,
        type: ErrorType.Network
      };
    }

    // HTTP status code errors
    switch (error.status) {
      case 400:
        return {
          message: error.message,
          userMessage: 'Invalid request. Please check your input and try again.',
          statusCode: 400,
          type: ErrorType.BadRequest
        };

      case 401:
        return {
          message: error.message,
          userMessage: 'Authentication required. Please log in and try again.',
          statusCode: 401,
          type: ErrorType.Unauthorized
        };

      case 403:
        // GitHub rate limiting returns 403
        if (context === 'GitHub') {
          return {
            message: error.message,
            userMessage: 'GitHub API rate limit exceeded. Please try again in a few minutes.',
            statusCode: 403,
            type: ErrorType.RateLimited
          };
        }
        return {
          message: error.message,
          userMessage: 'Access denied. You do not have permission to access this resource.',
          statusCode: 403,
          type: ErrorType.Unauthorized
        };

      case 404:
        return {
          message: error.message,
          userMessage: this.getNotFoundMessage(context),
          statusCode: 404,
          type: ErrorType.NotFound
        };

      case 429:
        return {
          message: error.message,
          userMessage: 'Too many requests. Please wait a moment and try again.',
          statusCode: 429,
          type: ErrorType.RateLimited
        };

      case 500:
      case 502:
      case 503:
      case 504:
        return {
          message: error.message,
          userMessage: 'Server is temporarily unavailable. Please try again later.',
          statusCode: error.status,
          type: ErrorType.ServerError
        };

      default:
        return {
          message: error.message,
          userMessage: 'Something went wrong. Please try again.',
          statusCode: error.status,
          type: ErrorType.Unknown
        };
    }
  }

  /**
   * Returns context-specific "not found" messages
   */
  private getNotFoundMessage(context?: string): string {
    switch (context) {
      case 'GitHub':
        return 'GitHub user or repository not found. Please check the username.';
      case 'Weather':
        return 'City not found. Please check the spelling and try again.';
      case 'Post':
        return 'Post not found. It may have been removed.';
      default:
        return 'The requested resource was not found.';
    }
  }

  /**
   * Utility method to get a simple error message string from an AppError or unknown error
   */
  getErrorMessage(error: unknown): string {
    if (this.isAppError(error)) {
      return error.userMessage;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }

  /**
   * Type guard for AppError
   */
  isAppError(error: unknown): error is AppError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'userMessage' in error &&
      'type' in error
    );
  }
}
