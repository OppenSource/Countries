import { Injectable } from '@angular/core';
import { Region } from '../models/region.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SousRegion } from '../models/sousregion.model';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class PaysService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private searchResultCountSource = new BehaviorSubject<number>(0);
  searchResultCount$ = this.searchResultCountSource.asObservable();

  private rateResultCountSource = new BehaviorSubject<number>(0);
  rateResultCount$ = this.rateResultCountSource.asObservable();

  constructor(private http: HttpClient) {}



  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUniqueRegions(): Observable<Region[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((countries) => this.extractUniqueRegions(countries)));
  }

  private extractUniqueRegions(countries: any[]): Region[] {
    const uniqueRegionsSet = new Set<string>();

    countries.forEach((country) => {
      if (country.region) {
        uniqueRegionsSet.add(country.region);
      }
    });

    const uniqueRegionsArray: Region[] = Array.from(uniqueRegionsSet).map(
      (region) => {
        return { nom: region };
      }
    );

    return uniqueRegionsArray;
  }

  getUniqueSubregions(selectedRegion: Region): Observable<SousRegion[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((countries) =>
          this.extractSubregionsByRegion(countries, selectedRegion)
        )
      );
  }

  private extractSubregionsByRegion(
    countries: any[],
    selectedRegion: Region
  ): SousRegion[] {
    const subregionsSet = new Set<string>();
    let tabSousRegion: SousRegion[];

    countries.forEach((country) => {
      const region = country.region;
      const subregion = country.subregion;
      if (region && subregion && region === selectedRegion) {
        subregionsSet.add(subregion);
      }
    });

    const subregionObjects: any[] = Array.from(subregionsSet).map(
      (subregion) => ({ subregion: subregion })
    );
    return subregionObjects;
  }

  getUniqueCountries(selectedSousRegion: SousRegion): Observable<Set<Country>> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((countries) => this.extractCountry(countries, selectedSousRegion))
      );
  }

  private extractCountry(
    countries: any[],
    selectedRegion: SousRegion
  ): Set<Country> {
    const subregionsSet = new Set<Country>();
    countries.forEach((country) => {
      const region = country;
      const subregion = country.subregion;
      if (region && subregion && subregion === selectedRegion) {
        const object: Country = {
          nom: region.translations.fra.common,
          population: region.population,
          image: region.flags.png,
          capitale: region.capital,
        };
        subregionsSet.add(object);
      }
    });
    return subregionsSet;
  }


  updateSearchResultCount(count: number) {
    this.searchResultCountSource.next(count);
  }


  updateRatingResult(count: number) {
    this.rateResultCountSource.next(count);
  }
}
