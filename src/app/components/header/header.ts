import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class Header {
  themeService = inject(ThemeService);

  // Track which dropdown is currently open (null = none open)
  openDropdown = signal<string | null>(null);

  toggleDropdown(name: string, event: Event) {
    event.stopPropagation();
    this.openDropdown.update(current => current === name ? null : name);
  }

  closeDropdowns() {
    this.openDropdown.set(null);
  }

  onDocumentClick(event: Event) {
    // Close dropdowns when clicking outside
    this.closeDropdowns();
  }

  onDropdownLinkClick() {
    // Close dropdown after navigating
    this.closeDropdowns();
  }
}