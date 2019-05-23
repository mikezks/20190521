import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromApp from './reducers/app.reducer';

export interface RootState {
  app: fromApp.State
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer
};


export const metaReducers: MetaReducer<RootState>[] =
  !environment.production ? [ storeFreeze ] : [];
