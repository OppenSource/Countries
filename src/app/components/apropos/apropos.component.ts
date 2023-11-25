import { PaysService } from 'src/app/services/pays.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss'],
})
export class AproposComponent {
  rate: number = 0;

  constructor(private paysService : PaysService) {}

  handleRate(event: any) {
    this.paysService.updateRatingResult(event);
  }
}
