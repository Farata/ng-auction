import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {
  params = new BehaviorSubject<SearchParams>({});
}

export interface SearchParams {
  title?: string;
}
