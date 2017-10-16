import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SearchService } from './shared/services';

@Component({
  selector: 'nga-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) matSidenav: MatSidenav;

  constructor(private searchService: SearchService) {}

  ngAfterViewInit() {
    this.searchService.params.subscribe(() => this.matSidenav.close());
  }
}
