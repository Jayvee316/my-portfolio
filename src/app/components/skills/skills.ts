import { Component } from '@angular/core';

interface SkillCategory {
  category: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  skillCategories: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: ['Angular 12-19', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3/SCSS', 'Responsive Design']
    },
    {
      category: 'Angular Specific',
      skills: ['Standalone Components', 'Signals', 'RxJS', 'NgRx', 'Angular Material', 'Reactive Forms']
    },
    {
      category: 'Backend & APIs',
      skills: ['RESTful APIs', 'Node.js', 'Express', 'Firebase', 'GraphQL']
    },
    {
      category: 'Tools & Others',
      skills: ['Git/GitHub', 'VS Code', 'npm/yarn', 'Webpack', 'Jest', 'Jasmine']
    }
  ];
}