import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/home/home.component';
import { PageSubRoxoComponent } from './pages/sub-roxo/sub-roxo.component';


const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'screen2', component: PageSubRoxoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MfeRoutingModule {}
