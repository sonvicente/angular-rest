import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuarios.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

import { Usuarios2Service } from '../usuarios2.service';


@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: Usuarios2Service,
    /* private service: UsuarioService, */
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const usuario = this.route.snapshot.data['usuario'];

    this.form = this.fb.group({
      id: [usuario.id],
      username: [usuario.username, [Validators.required]],
      firstname: [usuario.firstname, [Validators.required]],
      lastname: [usuario.lastname, [Validators.required]],
      password: [usuario.password, [Validators.required]],
      email: [usuario.email, [Validators.required]],
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Usuario criado com sucesso!';
      let msgError = 'Erro ao criar Usuario, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Usuario atualizado com sucesso!';
        msgError = 'Erro ao atualizar Usuario, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

}
