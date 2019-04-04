
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuarioResolverGuard } from './guards/usuario-resolver.guard';

const routes: Routes = [
  {path: '', component: UsuariosListaComponent},
  {
    path: 'novo',
    component: UsuariosFormComponent,
    resolve: {
      usuario: UsuarioResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: UsuariosFormComponent,
    resolve: {
      usuario: UsuarioResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
