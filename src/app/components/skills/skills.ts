import { Component, signal, effect, ChangeDetectionStrategy } from '@angular/core';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills {
  // Signal to trigger animations
  showProgress = signal(false);
  
  skillCategories: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular', level: 90, color: '#dd0031' },
        { name: 'TypeScript', level: 85, color: '#3178c6' },
        { name: 'JavaScript', level: 80, color: '#f7df1e' },
        { name: 'HTML/CSS', level: 95, color: '#e34c26' },
        { name: 'SCSS/Sass', level: 85, color: '#cc6699' }
      ]
    },
    {
      category: 'Angular Ecosystem',
      skills: [
        { name: 'RxJS', level: 75, color: '#b7178c' },
        { name: 'NgRx', level: 70, color: '#412846' },
        { name: 'Angular Material', level: 80, color: '#3f51b5' },
        { name: 'Signals', level: 85, color: '#dd0031' },
        { name: 'Standalone Components', level: 90, color: '#dd0031' }
      ]
    },
    {
      category: 'Backend & Tools',
      skills: [
        { name: 'Node.js', level: 70, color: '#339933' },
        { name: 'Firebase', level: 75, color: '#ffca28' },
        { name: 'Git/GitHub', level: 85, color: '#f05032' },
        { name: 'REST APIs', level: 80, color: '#61dafb' }
      ]
    }
  ];
  
  constructor() {
    // Trigger animation after component loads
    effect(() => {
      setTimeout(() => {
        this.showProgress.set(true);
      }, 300);
    });
  }
}