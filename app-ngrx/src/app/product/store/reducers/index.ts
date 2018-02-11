import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromProduct from './product';

export interface ProductState {
  product: fromProduct.State;
}

export interface State extends fromRoot.State {
  productPage: ProductState;
}

export const reducers = {
  product: fromProduct.reducer
};

/**
 * Selectors
 */

export const getProductPageState = createFeatureSelector<ProductState>('productPage');
export const getProductState = createSelector(getProductPageState, state => state.product);
export const getSelectedProduct = createSelector(getProductState, fromProduct.getSelected);
export const getSuggestedProducts = createSelector(getProductState, fromProduct.getSuggested);

