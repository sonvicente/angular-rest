import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuarios.service';
import { Usuario } from './../usuario';
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuarios2Service } from '../usuarios2.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
  preserveWhitespaces: true
})
export class UsuariosListaComponent implements OnInit {
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  usuarios$: Observable<Usuario[]>;
  error$ = new Subject<boolean>();

  usuarioSelecionado: Usuario;

  constructor(
    private service: Usuarios2Service,
    /* private service: UsuarioService, */
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.usuarios$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar usuarios. Tente novamente mais tarde.');
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(usuario) {
    this.usuarioSelecionado = usuario;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse usuario?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(usuario.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover usuario. Tente novamente mais tarde.');
      }
    );
  }

  onConfirmDelete() {
    this.service.remove(this.usuarioSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover usuario. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
