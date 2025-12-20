import { Pipe, PipeTransform } from '@angular/core';

/**
 * TimeAgoPipe - Converts dates to human-readable relative time
 *
 * Transforms a date into a relative time string like:
 * - "just now" (< 1 minute)
 * - "5 minutes ago"
 * - "2 hours ago"
 * - "3 days ago"
 * - "2 weeks ago"
 * - "1 month ago"
 * - "1 year ago"
 *
 * Usage in templates:
 *   {{ someDate | timeAgo }}
 *   {{ '2024-01-15T10:30:00Z' | timeAgo }}
 *   {{ user.createdAt | timeAgo }}
 *
 * Pipes are pure by default - Angular only recalculates when input changes.
 * For live updating time, you'd need to trigger change detection periodically.
 */
@Pipe({
  name: 'timeAgo',
  // standalone: true is default in Angular 19+
})
export class TimeAgoPipe implements PipeTransform {
  /**
   * Transform a date value into a relative time string
   * @param value - Date object, ISO string, or timestamp
   * @returns Human-readable relative time string
   */
  transform(value: Date | string | number | null | undefined): string {
    if (!value) {
      return '';
    }

    // Convert input to Date object
    const date = value instanceof Date ? value : new Date(value);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle future dates
    if (seconds < 0) {
      return 'in the future';
    }

    // Define time intervals in seconds
    const intervals: { label: string; seconds: number }[] = [
      { label: 'year', seconds: 31536000 },   // 365 days
      { label: 'month', seconds: 2592000 },   // 30 days
      { label: 'week', seconds: 604800 },     // 7 days
      { label: 'day', seconds: 86400 },       // 24 hours
      { label: 'hour', seconds: 3600 },       // 60 minutes
      { label: 'minute', seconds: 60 },       // 60 seconds
    ];

    // Find the appropriate interval
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        // Handle singular vs plural
        const plural = count === 1 ? '' : 's';
        return `${count} ${interval.label}${plural} ago`;
      }
    }

    // Less than a minute
    return 'just now';
  }
}
