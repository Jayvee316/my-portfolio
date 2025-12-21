import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

/**
 * Header - Main navigation component
 *
 * Features:
 * - Responsive navigation menu
 * - Dropdown menus for grouped items (GitHub, Contact)
 * - Dark/light theme toggle
 * - Active link highlighting via routerLinkActive
 *
 * Dropdown Behavior:
 * - Click dropdown button to open/close
 * - Click outside to close (via host listener on document)
 * - Click link inside dropdown to navigate and close
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Listen for clicks anywhere on the document to close dropdowns
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class Header {
  themeService = inject(ThemeService);
  authService = inject(AuthService);

  /** Tracks which dropdown is open - 'github', 'contact', or null (none) */
  openDropdown = signal<string | null>(null);

  /** Toggle dropdown open/closed. stopPropagation prevents document click from immediately closing it */
  toggleDropdown(name: string, event: Event) {
    event.stopPropagation();
    this.openDropdown.update(current => current === name ? null : name);
  }

  closeDropdowns() {
    this.openDropdown.set(null);
  }

  onDocumentClick(event: Event) {
    this.closeDropdowns();
  }

  onDropdownLinkClick() {
    this.closeDropdowns();
  }
}