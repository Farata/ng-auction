import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';

import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
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
export class HomeComponent implements AfterViewInit {
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

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  constructor(
    private media: ObservableMedia,
    private productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = this.productService.getAllCategories()
      .map(categories => ['all', 'featured', ...categories])
      .share(); // To avoid multiple HTTP requests to the products.json file.

    this.products$ = this.route.params
      .switchMap(({ category }) => this.getCategory(category))
      .combineLatest(this.searchService.params)
      .debounceTime(10) // To prevent sending two HTTP requests when category and search params change nearly at the same time.
      .map(([ products, params ]) => this.filterProducts(products, params));

    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias));
  }

  ngAfterViewInit() {
    // Sets initial selection for the tab bar.
    const category = this.route.snapshot.params['category'];
    this.categories$.first().subscribe(categories => {
      this.matTabGroup.selectedIndex = categories.indexOf(category);
      this.matTabGroup.selectedTabChange
        .skip(1) // Data for the initially selected category is already loaded. No need to trigger it one more time.
        .subscribe(this.onCategoryChange.bind(this));
    });
  }

  onCategoryChange(event: MatTabChangeEvent): void {
    // Updates category parameter for the current route,
    // which in turn triggers fetching corresponding products.
    const category = event.tab.textLabel.toLowerCase();
    this.router.navigate([ category ], { relativeTo: this.route.parent });
    this.searchService.params.next({}); // Reset search params.
  }

  private getCategory(category: string): Observable<Product[]> {
    switch (category.toLowerCase()) {
      case 'all':      return this.productService.getAll();
      case 'featured': return this.productService.getFeatured();
      default:         return this.productService.getByCategory(category.toLowerCase());
    }
  }

  private filterProducts(products: Product[], params: SearchParams): Product[] {
    return params.title
      ? products.filter(p => p.title.toLowerCase().includes((<string>params.title).toLowerCase()))
      : products;
  }
}
