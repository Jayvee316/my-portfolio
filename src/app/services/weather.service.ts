import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

/**
 * WeatherService - OpenWeatherMap API integration
 *
 * Fetches current weather data for any city using the OpenWeatherMap API.
 * Returns temperature (Celsius), humidity, wind speed, and conditions.
 *
 * API Key Setup:
 * 1. Sign up at https://openweathermap.org/api
 * 2. Get your free API key from the dashboard
 * 3. Replace the apiKey below or add to environment.ts
 *
 * Note: Free tier allows 1,000 calls/day
 */

/** Weather API response structure */
export interface WeatherData {
  name: string;  // City name
  main: {
    temp: number;       // Temperature in Celsius (we use units=metric)
    feels_like: number; // "Feels like" temperature
    humidity: number;   // Humidity percentage
  };
  weather: Array<{
    description: string; // e.g., "scattered clouds"
    icon: string;        // Icon code for weather condition
  }>;
  wind: {
    speed: number;  // Wind speed in m/s
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // API key loaded from environment file - keeps secrets out of source code
  private apiKey = environment.openweather.apiKey;

  /** Fetches current weather for a city. Uses metric units (Celsius, m/s). */
  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url).pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorService.handleHttpError(error, 'Weather')
      )
    );
  }
}
