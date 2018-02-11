import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearch from './search';

export interface State {
  search: fromSearch.State;

  // Global state such as routing can be added here:
  // router: fromRouter.State;
}

export const reducers = {
  search: fromSearch.reducer
};

export const getSearchState = createFeatureSelector<fromSearch.State>('search');
export const getSearchParams = createSelector(getSearchState, fromSearch.getParams);
