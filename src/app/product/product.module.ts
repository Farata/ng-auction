import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ])
  ],
  declarations: [
    ProductComponent
  ]
})
export class ProductModule {}
