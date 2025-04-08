import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ModuleFailComponent } from './module-fail.component';
import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [{ path: '**', component: ModuleFailComponent }]

@NgModule({
  declarations: [ModuleFailComponent],
  imports: [CommonModule],
  providers: [provideRouter(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleFailModule { }
