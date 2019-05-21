import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FlightSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule { }
