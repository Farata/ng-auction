import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdFormFieldModule, MdInputModule } from '@angular/material';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MdFormFieldModule,
    MdInputModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {}
