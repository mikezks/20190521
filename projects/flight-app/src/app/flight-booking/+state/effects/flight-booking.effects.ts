import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FlightBookingActionTypes, FlightBookingActions } from '../actions/flight-booking.actions';


@Injectable()
export class FlightBookingEffects {
/* 

  @Effect()
  loadFlightBookings$ = this.actions$.pipe(
    ofType(FlightBookingActionTypes.LoadFlightBookings),
    /** An EMPTY observable only emits completion. Replace with your own observable API request /
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<FlightBookingActions>) {} */

}
