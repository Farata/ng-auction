import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../shared/services';
import { State } from '../store';
import { SearchProducts } from '../store/actions';
import { getProductData } from '../store/reducers';


@Component({
  selector: 'nga-search',
  styleUrls: [ './search.component.scss' ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnDestroy {
  readonly products$: Observable<Product[]>;
  private readonly paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.products$ = this.store.pipe(select(getProductData));
    this.paramsSubscription = this.route.queryParams.subscribe(
      params => this.store.dispatch(new SearchProducts({ params }))
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
