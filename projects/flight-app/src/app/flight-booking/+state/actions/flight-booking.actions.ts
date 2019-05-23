import { Action } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  FlightsLoadAction = '[FlightBooking] Load Flights',
  FlightsLoadedAction = '[FlightBooking] Flights loaded',
  FlightUpdateAction = '[FlightBooking] Update Flight'  
}

export class FlightsLoadAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoadAction;
  constructor(readonly from: string, readonly to: string) {}
}

export class FlightsLoadedAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoadedAction;
  constructor(readonly flights: Flight[]) {}
}

export class FlightUpdateAction implements Action {
  readonly type = FlightBookingActionTypes.FlightUpdateAction;
  constructor(readonly flight: Flight) {}
}


export type FlightBookingActions = 
  FlightsLoadAction |
  FlightsLoadedAction |
  FlightUpdateAction;
