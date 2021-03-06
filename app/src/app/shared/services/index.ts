import { Provider } from '@angular/core';
import { BidService } from './bid.service';
import { ProductService, HttpProductService } from './product.service';

export { BidMessage, BidService } from './bid.service';
export { Product, ProductSearchParams, ProductService } from './product.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: BidService, useClass: BidService },
  { provide: ProductService, useClass: HttpProductService }
];
