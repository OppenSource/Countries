import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticDataService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  constructor(private http: HttpClient) {}

  getCountriesByRegion(
    region: string,
    numberOfCountries: number
  ): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((countries) =>
        countries
          .filter((country) => country.region === region)
          .sort((a, b) => b.population - a.population)
          .slice(0, numberOfCountries)
          .map((country) => ({
            name: country.name.common,
            value: country.population,
          }))
      )
    );
  }
}
