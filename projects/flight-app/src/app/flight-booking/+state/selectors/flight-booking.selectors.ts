import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FeatureState, State} from "../reducers/flight-booking.reducer";

export const getFlightBookingState =
    createFeatureSelector<FeatureState, State>('flightBooking');

export const getFlights =
    createSelector(
        getFlightBookingState,
        (state: State) => state.flights
    );

export const getDelayedFlights =
    createSelector(
        getFlights,
        flights => flights.filter(f => f.delayed)
    );

export const getSumDelayedFlights =
    createSelector(
        getDelayedFlights,
        flights => flights.length
    );

