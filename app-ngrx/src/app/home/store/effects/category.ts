import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ProductService } from '../../../shared/services';
import { CategoryActionTypes, LoadCategoriesFailure, LoadCategoriesSuccess } from '../actions';


@Injectable()
export class CategoryEffects {
  @Effect()
  loadCategories$: Observable<Action> = this.actions$
    .pipe(
      ofType(CategoryActionTypes.Load),
      switchMap(() => this.productService.getAllCategories()),
      map(categories => new LoadCategoriesSuccess({ categories })),
      catchError(error => of(new LoadCategoriesFailure({ error })))
    );

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {
  }
}
