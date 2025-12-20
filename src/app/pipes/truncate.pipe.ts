import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe - Shortens text to a specified length
 *
 * Truncates long strings and adds an ellipsis (...) or custom suffix.
 * Useful for card descriptions, preview text, etc.
 *
 * Usage in templates:
 *   {{ longText | truncate }}              → truncates at 100 chars (default)
 *   {{ longText | truncate:50 }}           → truncates at 50 chars
 *   {{ longText | truncate:50:'...' }}     → custom suffix
 *   {{ longText | truncate:50:'... more' }}→ "Read more" style suffix
 *
 * Examples:
 *   "Hello World" | truncate:5        → "Hello..."
 *   "Short" | truncate:100            → "Short" (no truncation needed)
 *   "Hello World" | truncate:5:'→'    → "Hello→"
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Transform a string by truncating it to a max length
   * @param value - The string to truncate
   * @param limit - Maximum character length (default: 100)
   * @param suffix - String to append when truncated (default: '...')
   * @returns Truncated string with suffix, or original if shorter than limit
   */
  transform(
    value: string | null | undefined,
    limit: number = 100,
    suffix: string = '...'
  ): string {
    if (!value) {
      return '';
    }

    // No truncation needed
    if (value.length <= limit) {
      return value;
    }

    // Truncate and add suffix
    // Try to break at a word boundary for cleaner results
    let truncated = value.substring(0, limit);

    // Find last space to avoid cutting words in half
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > limit * 0.8) {
      // Only use word boundary if it's not too far back
      truncated = truncated.substring(0, lastSpace);
    }

    return truncated.trim() + suffix;
  }
}
