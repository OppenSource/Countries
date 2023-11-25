import { Country } from './../../models/country.model';
import { Component, Input, OnInit } from '@angular/core';
import { PaysService } from 'src/app/services/pays.service';
import { Observable, forkJoin } from 'rxjs';
import { SousRegion } from 'src/app/models/sousregion.model';
import { ToastrService } from 'ngx-toastr';
import { StatisticDataService } from 'src/app/services/statistic-data.service';

interface Region {
  nom: string;
}

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
})
export class AcceuilComponent implements OnInit {
  listRegions: Region[] = [];
  listSousRegions: SousRegion[] = [];
  listPays: Country[] = [];
  selectedRegion: Region | any;
  selectedSubRegion: SousRegion | any;
  @Input() searchResultCount: number = 0;

  graph_afrique: any[] = [];
  graph_europe: any[] = [];
  graph_asia: any[] = [];
  graph_america: any[] = [];
  dataIsLoaded: boolean = false;

  constructor(
    private paysService: PaysService,
    private toastr: ToastrService,
    private statisticService: StatisticDataService
  ) {}

  ngOnInit(): void {
    this.getUniqueRegion();
  }

  async getUniqueRegion() {
    try {
      const regions = await this.paysService.getUniqueRegions().toPromise();
      if (regions) {
        this.listRegions = regions;
        this.showSuccessMessage('La liste des régions affichée');
      } else {
        this.showErrorMessage("La liste des régions n'a pas été affichée.");
      }
    } catch (error) {
      this.showErrorMessage("La liste des régions n'a pas été affichée.");
    }
  }

  async handleRegionSelection(selectedRegion: string) {
    this.selectedRegion = selectedRegion;
    this.onRegionSelectionChange();
  }

  async handleSubRegionSelection(selectedSubRegion: string) {
    this.selectedSubRegion = selectedSubRegion;
    this.loadCountries();
  }

  async loadSubregions() {
    try {
      const sousregions = await this.paysService
        .getUniqueSubregions(this.selectedRegion)
        .toPromise();
      if (sousregions) {
        this.listSousRegions = sousregions;
        this.showSuccessMessage('La liste des sous-régions affichée');
      } else {
        this.showErrorMessage(
          "La liste des sous-régions n'a pas été affichée."
        );
      }
    } catch (error) {
      this.showErrorMessage("La liste des sous-régions  n'a pas été affichée.");
    }
  }

  onRegionSelectionChange() {
    this.loadSubregions();
  }

  async loadCountries() {
    try {
      const countries = await this.paysService
        .getUniqueCountries(this.selectedSubRegion)
        .toPromise();
      if (countries) {
        this.listPays = Array.from(new Set(countries));
        this.showSuccessMessage('La liste des pays affichée.');
      } else {
        this.showErrorMessage('La liste des pays est non définie.');
      }
    } catch (error) {
      this.showErrorMessage('Erreur lors du chargement des pays.');
    }
  }

  async loadCountriesOfAfrica() {
    try {
      const countries = await this.paysService
        .getUniqueCountries(this.selectedSubRegion)
        .toPromise();
      if (countries) {
        this.listPays = Array.from(new Set(countries));
        this.showSuccessMessage('La liste des pays affichée.');
      } else {
        this.showErrorMessage('La liste des pays est non définie.');
      }
    } catch (error) {
      this.showErrorMessage('Erreur lors du chargement des pays.');
    }
  }

  showSuccessMessage(message: any) {
    this.toastr.success(message);
  }

  showErrorMessage(message: any) {
    this.toastr.error(message);
  }

  async loadStatistics(): Promise<void> {
    try {
      const results = await forkJoin({
        africa: this.statisticService
          .getCountriesByRegion('Africa', 10)
          .toPromise(),
        europe: this.statisticService
          .getCountriesByRegion('Europe', 10)
          .toPromise(),
        asia: this.statisticService.getCountriesByRegion('Asia', 5).toPromise(),
        america: this.statisticService
          .getCountriesByRegion('Americas', 7)
          .toPromise(),
      }).toPromise();

      if (results) {
        this.graph_afrique = results.africa ?? [];
        this.graph_europe = results.europe ?? [];
        this.graph_asia = results.asia ?? [];
        this.graph_america = results.america ?? [];
      } else {
        // Gérer le cas où 'results' est undefined
        this.graph_afrique = [];
        this.graph_europe = [];
        this.graph_asia = [];
        this.graph_america = [];
      }

      this.dataIsLoaded = true;
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques', error);
      this.toastr.error('Erreur lors du chargement des statistiques');
      // Réinitialiser les graphiques en cas d'erreur
      this.graph_afrique = [];
      this.graph_europe = [];
      this.graph_asia = [];
      this.graph_america = [];
    }
  }
}
