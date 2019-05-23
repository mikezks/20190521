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
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer, RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface RootState {
  app: fromApp.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<RootState>[] =
  !environment.production ? [ storeFreeze ] : [];


export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
