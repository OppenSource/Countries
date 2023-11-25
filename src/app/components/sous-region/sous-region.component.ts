import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SousRegion } from 'src/app/models/sousregion.model';

@Component({
  selector: 'app-sous-region',
  templateUrl: './sous-region.component.html',
  styleUrls: ['./sous-region.component.scss']
})
export class SousRegionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() elements: SousRegion[] = [];
  @Output() regionSubregion: EventEmitter<any> = new EventEmitter<any>();



  selectSubRegion(region: any) {
    this.regionSubregion.emit(region);
  }

}
