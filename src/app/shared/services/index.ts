import { ProductService } from './product.service';
import { SearchService } from './search.service';

export { ProductService, Product } from './product.service';
export { SearchService, SearchParams } from './search.service';

export const SHARED_SERVICES = [
  ProductService,
  SearchService
];
