import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListComponent } from './pages/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pages/pessoa-form/pessoa-form.component';


const routes: Routes = [
  {
    path: 'list',
    component: PessoaListComponent
  },
  {
    path: 'form/:id',
    component: PessoaFormComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
