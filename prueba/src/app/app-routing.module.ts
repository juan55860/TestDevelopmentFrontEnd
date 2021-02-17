import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { BusquedaComponent } from './views/busqueda/busqueda.component';
import { PerfilComponent } from './views/perfil/perfil.component';

const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'busqueda' , component: BusquedaComponent },
  {path: 'perfil/:perfil', component: PerfilComponent},
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
