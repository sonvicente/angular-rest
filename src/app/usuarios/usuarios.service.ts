import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = `${environment.API}usuario`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.API)
      .pipe(
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<Usuario>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(usuario) {
    return this.http.post(this.API, usuario).pipe(take(1));
  }

  private update(usuario) {
    return this.http.put(`${this.API}/${usuario.id}`, usuario).pipe(take(1));
  }

  save(usuario) {
    if (usuario.id) {
      return this.update(usuario);
    }
    return this.create(usuario);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}