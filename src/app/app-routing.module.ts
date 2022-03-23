import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
