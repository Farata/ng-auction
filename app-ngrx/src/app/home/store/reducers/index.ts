import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromCategory from './category';
import * as fromProduct from './product';
// import * as fromSearch from './search';

export interface HomeState {
  category: fromCategory.State;
  product: fromProduct.State;
  // search: fromSearch.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers = {
  category: fromCategory.reducer,
  product: fromProduct.reducer,
  // search: fromSearch.reducer
};

/**
 * Selectors
 */

export const getHomeState = createFeatureSelector<HomeState>('home');

export const getProductState = createSelector(getHomeState, state => state.product);
export const getProductData = createSelector(getProductState, fromProduct.getData);
export const getProductDataLoading = createSelector(getProductState, fromProduct.getDataLoading);
export const getProductDataLoadingError = createSelector(getProductState, fromProduct.getDataLoadingError);

export const getCategoryState = createSelector(getHomeState, state => state.category);
export const getCategoryData = createSelector(getCategoryState, fromCategory.getData);

