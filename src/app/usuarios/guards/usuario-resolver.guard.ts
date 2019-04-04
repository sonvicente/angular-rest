import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverGuard implements Resolve<Usuario> {
  constructor(private service: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      username: null,
      firstname:null,
      lastname:null,
      password:null,
      email:null,
    });
  }
}