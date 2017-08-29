import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdIconModule,
  MdToolbarModule
} from '@angular/material';

import { SHARED_SERVICES } from './shared/services';
import { AppComponent } from './app.component';
import { routes } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),

    MdButtonModule,
    MdIconModule,
    MdToolbarModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class AppModule {}
