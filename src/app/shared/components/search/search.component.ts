import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services';

@Component({
  selector: 'nga-search',
  styleUrls: [ './search.component.scss' ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  title: FormControl;

  constructor(searchService: SearchService) {
    this.title = new FormControl();
    this.title.valueChanges
      .subscribe(title => searchService.params.next({ title }));
  }
}
