import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule } from '@angular/material';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ]),
    MdButtonModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ]
})
export class ProductModule {}
