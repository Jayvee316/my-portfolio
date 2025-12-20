import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

@Component({
  selector: 'app-projects',
  imports: [FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  // Signal for search term
  searchTerm = signal('');
  
  // All projects
  allProjects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'Admin dashboard with real-time analytics and inventory management. Features include sales tracking, user management, and data visualization.',
      technologies: ['Angular 18', 'TypeScript', 'RxJS', 'Chart.js'],
      githubLink: 'https://github.com/yourusername/project1',
      liveLink: 'https://project1-demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task manager with drag-and-drop functionality. Built with standalone components and signals for optimal performance.',
      technologies: ['Angular 19', 'Signals', 'Firebase', 'SCSS'],
      githubLink: 'https://github.com/yourusername/project2'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather app with location-based forecasts. Integrates with OpenWeather API to display current conditions and 7-day forecasts.',
      technologies: ['Angular 18', 'OpenWeather API', 'RxJS', 'SCSS'],
      githubLink: 'https://github.com/yourusername/project3',
      liveLink: 'https://project3-demo.com'
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support and comment system. Features include user authentication and post management.',
      technologies: ['Angular 19', 'Firebase', 'Markdown', 'Tailwind'],
      githubLink: 'https://github.com/yourusername/project4'
    }
  ];
  
  // Computed signal - automatically updates when searchTerm changes
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    
    if (!term) {
      return this.allProjects; // Show all if no search
    }
    
    // Filter by title, description, or technologies
    return this.allProjects.filter(project => 
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.technologies.some(tech => tech.toLowerCase().includes(term))
    );
  });
  
  // Clear search
  clearSearch() {
    this.searchTerm.set('');
  }
}