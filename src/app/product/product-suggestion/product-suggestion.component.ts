import 'rxjs/add/operator/map';
import { Component, Input } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/services';

@Component({
  selector: 'nga-product-suggestion',
  styleUrls: [ './product-suggestion.component.scss' ],
  templateUrl: './product-suggestion.component.html'
})
export class ProductSuggestionComponent {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 2 ],
    [ 'sm', 3 ],
    [ 'md', 5 ],
    [ 'lg', 2 ],
    [ 'xl', 3 ],
  ]);

  constructor(private media: ObservableMedia) {
    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias));
  }
}
