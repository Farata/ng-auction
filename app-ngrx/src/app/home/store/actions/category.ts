import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
  Load = '[Category] Load',
  LoadSuccess = '[Category] Load Success'
}

export class LoadCategories implements Action {
  readonly type = CategoryActionTypes.Load;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoryActionTypes.LoadSuccess;
  constructor(public readonly payload: { categories: string[] }) {}
}

export type CategoryActions
  = LoadCategories
  | LoadCategoriesSuccess;
