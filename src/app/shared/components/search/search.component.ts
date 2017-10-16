import { Component } from '@angular/core';
import { SearchService } from '../../services';

@Component({
  selector: 'nga-search',
  styleUrls: [ './search.component.scss' ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  search(params: any): void {
    this.searchService.params.next(params);
  }
}
