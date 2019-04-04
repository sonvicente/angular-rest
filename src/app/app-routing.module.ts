import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'', pathMatch:'full', redirectTo:'usuarios'
  },
  {
    path:'usuarios', 
    loadChildren:'./usuarios/usuarios.module#UsuariosModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
