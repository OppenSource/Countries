import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';

import { HttpClientModule } from '@angular/common/http';
import { RegionComponent } from './components/region/region.component';


import { FormsModule } from '@angular/forms';
import { PaysService } from './services/pays.service';
import { SousRegionComponent } from './components/sous-region/sous-region.component';
import { PaysComponent } from './components/pays/pays.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { BarRatingModule } from "ngx-bar-rating";


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, AcceuilComponent, RegionComponent, SousRegionComponent, PaysComponent, StatisticComponent, AproposComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    HttpClientModule,

    FormsModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
    NgxChartsModule,
    BarRatingModule,
  ],
  providers: [PaysService],
  bootstrap: [AppComponent],
})
export class AppModule {}
