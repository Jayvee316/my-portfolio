import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  projects: Project[] = [
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
    }
  ];
}