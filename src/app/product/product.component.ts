import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, first, map, skip, switchMap } from 'rxjs/operators';
import { Product, ProductService, SearchService } from '../shared/services';

@Component({
  selector: 'nga-product',
  styleUrls: [ './product.component.scss' ],
  templateUrl: './product.component.html'
})
export class ProductComponent {
  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private searchService: SearchService,
    private router: Router
  ) {
    this.product$ = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('productId') || '', 10)),
        filter(productId => !!productId),
        switchMap(productId => this.productService.getById(productId))
      );

    this.suggestedProducts$ = this.productService.getAll();

    this.searchService.params
      .pipe(
        // Since we use BehaviorSubject for params, it emits the current value to every new subscriber.
        // To avoid navigation to the home page every time the product page is opened, skip initial value.
        skip(1),
        first()
      )
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
