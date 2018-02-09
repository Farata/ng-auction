import { Action } from '@ngrx/store';
import { Product } from '../../../shared/services';


export enum ProductActionTypes {
  Load = '[Product] Load All',
  Search = '[Product] Search',
  LoadFailure = '[Product] Load Failure',
  LoadSuccess = '[Product] Load Success',
  LoadProductsByCategory = '[Product] Load Products By Category',
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadProductsByCategory implements Action {
  readonly type = ProductActionTypes.LoadProductsByCategory;
  constructor(public readonly payload: { category: string }) {}
}

export class LoadProductsFailure implements Action {
  readonly type = ProductActionTypes.LoadFailure;
  constructor(public readonly payload: { error: string }) {}
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;
  constructor(public readonly payload: { products: Product[] }) {}
}

export class SearchProducts implements Action {
  readonly type = ProductActionTypes.Search;
  constructor(public readonly payload: { params: { [key: string]: any } }) {}
}

export type ProductActions
  = LoadProducts
  | LoadProductsByCategory
  | LoadProductsFailure
  | LoadProductsSuccess
  | SearchProducts;
