import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from '@/pages/home/home.component';
import { PageScreen2Component } from '@/pages/screen2/screen2.component';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'screen2', component: PageScreen2Component },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MfeRoutingModule {}
