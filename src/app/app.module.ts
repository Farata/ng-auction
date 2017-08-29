import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdIconModule,
  MdToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { routes } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,

    MdButtonModule,
    MdIconModule,
    MdToolbarModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
