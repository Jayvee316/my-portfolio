import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StarRating } from '../star-rating/star-rating';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  rating: number;
  githubLink?: string;
  liveLink?: string;
}

@Component({
  selector: 'app-projects',
  imports: [FormsModule, StarRating, ConfirmDialog],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  // Signal for search term
  searchTerm = signal('');

  // Signal for projects - allows reactive updates when rating changes
  allProjects = signal<Project[]>([
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'Admin dashboard with real-time analytics and inventory management. Features include sales tracking, user management, and data visualization.',
      technologies: ['Angular 18', 'TypeScript', 'RxJS', 'Chart.js'],
      rating: 4,
      githubLink: 'https://github.com/yourusername/project1',
      liveLink: 'https://project1-demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task manager with drag-and-drop functionality. Built with standalone components and signals for optimal performance.',
      technologies: ['Angular 19', 'Signals', 'Firebase', 'SCSS'],
      rating: 5,
      githubLink: 'https://github.com/yourusername/project2'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather app with location-based forecasts. Integrates with OpenWeather API to display current conditions and 7-day forecasts.',
      technologies: ['Angular 18', 'OpenWeather API', 'RxJS', 'SCSS'],
      rating: 3,
      githubLink: 'https://github.com/yourusername/project3',
      liveLink: 'https://project3-demo.com'
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support and comment system. Features include user authentication and post management.',
      technologies: ['Angular 19', 'Firebase', 'Markdown', 'Tailwind'],
      rating: 4,
      githubLink: 'https://github.com/yourusername/project4'
    }
  ]);

  // Computed signal - automatically updates when searchTerm or allProjects changes
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const projects = this.allProjects();

    if (!term) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(term))
    );
  });

  // Clear search
  clearSearch() {
    this.searchTerm.set('');
  }

  // Handle rating change from StarRating component
  // This is called when the output() emits an event
  onRatingChange(projectId: number, newRating: number) {
    // Update the project's rating using signal's update method
    this.allProjects.update((projects) =>
      projects.map((project) =>
        project.id === projectId ? { ...project, rating: newRating } : project
      )
    );
  }

  // ===== CONFIRM DIALOG DEMO =====
  // Signals to control dialog visibility and track which project to delete
  showDeleteDialog = signal(false);
  projectToDelete = signal<Project | null>(null);

  // Computed message for delete dialog - sanitizes title to prevent XSS
  deleteMessage = computed(() => {
    const project = this.projectToDelete();
    if (!project) return 'Are you sure you want to delete this project?';
    // Sanitize title by encoding special characters
    const safeTitle = project.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return `Are you sure you want to delete '${safeTitle}'? This action cannot be undone.`;
  });

  // Called when user clicks delete button on a project
  onDeleteClick(project: Project) {
    this.projectToDelete.set(project);
    this.showDeleteDialog.set(true);
  }

  // Called when user confirms deletion (output from ConfirmDialog)
  onDeleteConfirmed() {
    const project = this.projectToDelete();
    if (project) {
      // Remove the project from the list
      this.allProjects.update((projects) =>
        projects.filter((p) => p.id !== project.id)
      );
    }
    this.closeDeleteDialog();
  }

  // Called when user cancels (output from ConfirmDialog)
  onDeleteCancelled() {
    this.closeDeleteDialog();
  }

  // Helper to close dialog and reset state
  private closeDeleteDialog() {
    this.showDeleteDialog.set(false);
    this.projectToDelete.set(null);
  }
}
