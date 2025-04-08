import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MfeRoutingModule } from './mfe.routing';

@NgModule({
  imports: [
    CommonModule,
    MfeRoutingModule
  ],
  declarations: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MfeModule { }
