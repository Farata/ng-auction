import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface Store {
  featured: number[],
  products: Product[]
}

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Store>('/data/products.json')
      .map(data => data.products);
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Store>('/data/products.json')
      .map(({ products }) => <Product>products.find(p => p.id === productId));
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Store>('/data/products.json')
      .map(({ products }) => products.filter(p => p.categories.includes(category)));
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<Store>('/data/products.json')
      .map(({ products }) => products.reduce((all, product) => all.concat(product.categories), <string[]>[]))
      .map(categories => Array.from(new Set(categories)));
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Store>('/data/products.json')
      .map(data => data.products.filter(p => data.featured.includes(p.id)));
  }
}
