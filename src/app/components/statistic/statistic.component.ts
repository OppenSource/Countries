import { PaysService } from './../../services/pays.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent  implements OnInit {
  @Input() data_country: any[] = [];
  @Input() dataIsLoaded: boolean = false
  @Input() dataIsLoading: boolean | any


  constructor(private paysService: PaysService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.paysService.getAllCountries().subscribe(data => {
      this.data_country = data.map(country => ({
        name: country.name.common, // ou un autre champ approprié
        value: country.population
      }));

      this.dataIsLoaded = true;
    });
  }


}

