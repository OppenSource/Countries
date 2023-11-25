import { PaysService } from './../../services/pays.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss'],
})
export class PaysComponent {
  @Input() title: string = '';
  @Input() elements: Country[] = [];
  @Input() searchResult: Country[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';
  @Output() searchResultCount: number = 0;


  constructor(private paysService: PaysService) {}

  onInputChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchResult =
      query.trim() !== ''
        ? this.elements.filter((country) =>
            country.nom.toLowerCase().includes(query.toLowerCase())
          )
        : this.elements;
    this.searchResultCount = this.searchResult.length;

    this.paysService.updateSearchResultCount(this.searchResult.length);
  }

  getPaginatedPays(): Country[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.searchResult.slice(startIndex, endIndex);
  }
}
