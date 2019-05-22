import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightBookingComponent,
    FlightTypeaheadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlightBookingRoutingModule
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule { }
