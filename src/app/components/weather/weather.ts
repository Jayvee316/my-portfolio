import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { LoadingService } from '../../services/loading.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-weather',
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Weather {
  private weatherService = inject(WeatherService);
  private loadingService = inject(LoadingService);
  private errorService = inject(ErrorService);

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
        this.error.set(this.errorService.getErrorMessage(err));
        this.weather.set(null);
        this.loadingService.hide();
      }
    });
  }
  
  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}