import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  // Using Signals (NEW in Angular 16+)
  name = signal('Your Name');
  title = signal('Angular Developer');
  experience = signal('3+ years');
  
  // Array of expertise
  expertise = [
    'Angular 12 to 19',
    'TypeScript',
    'RxJS',
    'RESTful APIs',
    'Responsive Design',
    'Standalone Components',
    'Signals',
    'Modern Control Flow'
  ];
}