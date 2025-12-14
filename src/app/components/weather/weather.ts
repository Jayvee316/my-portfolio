import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-weather',
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss'
})
export class Weather {
  private weatherService = inject(WeatherService);
  private loadingService = inject(LoadingService);
  
  city = signal('Manila'); // Default city
  weather = signal<WeatherData | null>(null);
  error = signal('');
  
  searchWeather() {
    if (!this.city()) return;
    
    this.loadingService.show();
    this.error.set('');
    
    this.weatherService.getWeather(this.city()).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.loadingService.hide();
      },
      error: (err) => {
        this.error.set('City not found. Please try another city.');
        this.weather.set(null);
        this.loadingService.hide();
      }
    });
  }
  
  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}