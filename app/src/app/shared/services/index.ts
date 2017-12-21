import { Provider } from '@angular/core';
import { ProductService, HttpProductService } from './product.service';

export { Product, ProductSearchParams, ProductService } from './product.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: ProductService, useClass: HttpProductService }
];
