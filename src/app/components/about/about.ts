import { Component, signal, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  loadingService = inject(LoadingService);
  
  name = signal('Your Name');
  title = signal('Angular Developer');
  experience = signal('3+ years');
  
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
  
  // Test loading spinner
  async testLoading() {
    await this.loadingService.simulateLoading(3000);
    alert('Loading complete!');
  }
}