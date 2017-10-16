import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs/Observable';
import {
  Product,
  ProductService,
  SearchService,
  SearchParams
} from '../shared/services';

@Component({
  selector: 'nga-home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<string[]>;
  readonly columns$: Observable<number>;
  readonly products$: Observable<Product[]>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);

  constructor(
    private media: ObservableMedia,
    private productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.productService.getAllCategories()
      .map(categories => ['all', ...categories]);

    this.products$ = this.route.params
      .switchMap(({ category }) => this.getCategory(category))
      .combineLatest(this.searchService.params)
      .map(([ products, params ]) => this.filterProducts(products, params));

    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias))
      .startWith(3);
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all'
      ? this.productService.getAll()
      : this.productService.getByCategory(category.toLowerCase());
  }

  private filterProducts(products: Product[], params: SearchParams): Product[] {
    return params.title
      ? products.filter(p => p.title.toLowerCase().includes((<string>params.title).toLowerCase()))
      : products;
  }
}
