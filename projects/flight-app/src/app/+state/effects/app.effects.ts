import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AppActionTypes, AppActions } from '../actions/app.actions';


@Injectable()
export class AppEffects {

/* 
  @Effect()
  loadApps$ = this.actions$.pipe(
    ofType(AppActionTypes.LoadApps),
    /** An EMPTY observable only emits completion. Replace with your own observable API request   /
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<AppActions>) {} */

}
