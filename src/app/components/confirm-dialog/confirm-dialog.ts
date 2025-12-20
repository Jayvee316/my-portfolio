import {
  Component,
  input,
  output,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop -->
    <div class="dialog-backdrop" (click)="onCancel()">
      <!-- Dialog Box (stop click propagation) -->
      <div class="dialog-box" (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="dialog-header">
          <h3>{{ title() }}</h3>
        </div>

        <!-- Body -->
        <div class="dialog-body">
          <p>{{ message() }}</p>
        </div>

        <!-- Footer with buttons -->
        <div class="dialog-footer">
          <button
            type="button"
            class="btn btn-cancel"
            (click)="onCancel()">
            {{ cancelText() }}
          </button>
          <button
            type="button"
            class="btn btn-confirm"
            [class.btn-danger]="type() === 'danger'"
            [class.btn-warning]="type() === 'warning'"
            (click)="onConfirm()">
            {{ confirmText() }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog-box {
      background: var(--card-bg, white);
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 90%;
      animation: slideIn 0.2s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .dialog-header {
      padding: 1.5rem 1.5rem 0;

      h3 {
        margin: 0;
        font-size: 1.25rem;
        color: var(--text-color, #333);
      }
    }

    .dialog-body {
      padding: 1rem 1.5rem;

      p {
        margin: 0;
        color: #666;
        line-height: 1.6;
      }
    }

    .dialog-footer {
      padding: 1rem 1.5rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .btn {
      padding: 0.6rem 1.25rem;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-cancel {
      background: #e0e0e0;
      color: #333;

      &:hover {
        background: #d0d0d0;
      }
    }

    .btn-confirm {
      background: #3498db;
      color: white;

      &:hover {
        background: #2980b9;
      }
    }

    .btn-danger {
      background: #e74c3c;

      &:hover {
        background: #c0392b;
      }
    }

    .btn-warning {
      background: #f39c12;

      &:hover {
        background: #d68910;
      }
    }
  `]
})
export class ConfirmDialog {
  // ===========================================
  // INPUTS - Data flowing FROM parent TO child
  // ===========================================
  // input() creates a READ-ONLY signal
  // Parent passes data down, child cannot modify

  /** Dialog title displayed in header */
  title = input<string>('Confirm Action');

  /** Main message/question to display */
  message = input<string>('Are you sure you want to proceed?');

  /** Text for the confirm button */
  confirmText = input<string>('Confirm');

  /** Text for the cancel button */
  cancelText = input<string>('Cancel');

  /** Dialog type affects confirm button color */
  type = input<'default' | 'danger' | 'warning'>('default');

  // ===========================================
  // OUTPUTS - Events flowing FROM child TO parent
  // ===========================================
  // output() creates an event emitter
  // Child sends events up, parent listens and reacts

  /** Emitted when user clicks the confirm button */
  confirmed = output<void>();

  /** Emitted when user clicks cancel or backdrop */
  cancelled = output<void>();

  // ===========================================
  // METHODS - Handle user interactions
  // ===========================================

  onConfirm() {
    // Emit event to parent - parent decides what to do
    this.confirmed.emit();
  }

  onCancel() {
    // Emit event to parent - parent decides what to do
    this.cancelled.emit();
  }
}
