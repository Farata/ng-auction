import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdGridListModule } from '@angular/material';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
    FlexLayoutModule,
    MdGridListModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
