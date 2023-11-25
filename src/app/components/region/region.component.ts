import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Region } from 'src/app/models/region.model';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class RegionComponent {
  @Input() title: string = '';
  @Input() elements: Region[] = [];
  @Output() regionSelected: EventEmitter<any> = new EventEmitter<any>();


  constructor() {}

  selectRegion(region: any) {
    this.regionSelected.emit(region);
  }
}
