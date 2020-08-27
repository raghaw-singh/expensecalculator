import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BudgetComponent } from './pages/budget/budget.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'budget',
    component:BudgetComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
