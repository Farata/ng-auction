import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { Search, SearchActionTypes } from '../actions';


@Injectable()
export class SearchEffects {

  @Effect({ dispatch: false })
  searchProducts$ = this.actions$
    .pipe(
      ofType<Search>(SearchActionTypes.Search),
      map(action => action.payload.params),
      tap(params => this.router.navigate([ '/search' ], { queryParams: params }))
    );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {
  }
}
