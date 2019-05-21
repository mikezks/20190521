import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg';
  to: string = 'Graz';
  flights: Flight[] = [];
  selectedFlight: Flight;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  search(): void {
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        (flights: Flight[]) => {
          this.flights = flights;
        },
        (errResp) => {
          console.log('Error loading flights', errResp);
        }
      );
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

}
