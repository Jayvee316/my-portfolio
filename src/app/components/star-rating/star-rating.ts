import {
  Component,
  input,
  model,
  computed,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="star-rating" [class.readonly]="readonly()">
      @for (star of stars(); track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= rating()"
          [class.hovered]="!readonly() && star <= hoveredStar()"
          [disabled]="readonly()"
          [attr.aria-label]="'Rate ' + star + ' out of ' + maxStars() + ' stars'"
          (click)="onStarClick(star)"
          (mouseenter)="onStarHover(star)"
          (mouseleave)="onStarLeave()">
          @if (star <= (hoveredStar() || rating())) {
            ★
          } @else {
            ☆
          }
        </button>
      }
      @if (showLabel()) {
        <span class="rating-label">{{ rating() }} / {{ maxStars() }}</span>
      }
    </div>
  `,
  styles: [`
    .star-rating {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .star {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #ddd;
      transition: transform 0.1s, color 0.2s;
      padding: 0;
      line-height: 1;

      &:hover:not(:disabled) {
        transform: scale(1.2);
      }

      &.filled,
      &.hovered {
        color: #f39c12;
      }

      &:disabled {
        cursor: default;
      }
    }

    .readonly .star {
      cursor: default;

      &:hover {
        transform: none;
      }
    }

    .rating-label {
      margin-left: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class StarRating {
  // ===== MODEL (Two-Way Binding) =====
  // model() = input() + output() combined
  // - Can READ the value: this.rating()
  // - Can WRITE the value: this.rating.set(5)
  // - Parent uses [(rating)]="value" syntax

  /** Current rating value - supports two-way binding */
  rating = model<number>(0);

  // ===== INPUTS (One-Way Only) =====
  // These only receive data, they don't send changes back

  /** Maximum number of stars */
  maxStars = input<number>(5);

  /** If true, user cannot change rating */
  readonly = input<boolean>(false);

  /** Show "3 / 5" label next to stars */
  showLabel = input<boolean>(false);

  // ===== INTERNAL STATE =====
  hoveredStar = signal(0);

  // computed() works with both input() and model()
  stars = computed(() => {
    return Array.from({ length: this.maxStars() }, (_, i) => i + 1);
  });

  // ===== METHODS =====

  onStarClick(star: number) {
    if (this.readonly()) return;

    // With model(), we can directly SET the value
    // This automatically notifies the parent!
    this.rating.set(star);
  }

  onStarHover(star: number) {
    if (this.readonly()) return;
    this.hoveredStar.set(star);
  }

  onStarLeave() {
    this.hoveredStar.set(0);
  }
}
