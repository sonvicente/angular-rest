import { Injectable } from '@angular/core';
import { CrudService } from './../shared/crud-service';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Usuarios2Service extends CrudService<Usuario>{

  constructor(protected http: HttpClient) {
    super(http,`${environment.API}usuario`);
  }
}
