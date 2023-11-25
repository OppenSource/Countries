import { Component, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navigateToScore() {
    throw new Error('Method not implemented.');
  }
  searchResultCount: number | any;
  scoreResultCount: any;
  private subscription: Subscription | any;
  rate: any;

  constructor(private paysService: PaysService) {
    this.rate = this.paysService.rateResultCount$;
    this.searchResultCount = this.paysService.searchResultCount$
  }

}
