import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { finalize } from 'rxjs';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { RolDTO } from 'src/app/services/models/roles/rol';
import { NotifyService } from 'src/app/services/notify.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioDTO, UsuarioEditarDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  errores: string[] = [];
  roles: RolDTO[];
  usuario: UsuarioDTO;
  cambiarPassword = false;
  hide = false;

  constructor(
    private rolesService: RolesService,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getRoles();

    //deshabilitar campo password
    this.form.get('password').disable();
  }

  getRoles() {
    this.isLoading = true;

    this.rolesService
      .getRoles()
      .pipe(
        finalize(() => {
          this.getUsuario();
        })
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.roles = response;
          console.log(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idRol: ['', { validators: [Validators.required] }],
      nombre: [
        '',
        { validators: [Validators.required, Validators.maxLength(60)] },
      ],
      apellidoPaterno: [
        '',
        { validators: [Validators.required, Validators.maxLength(60)] },
      ],
      apellidoMaterno: [
        '',
        { validators: [Validators.required, Validators.maxLength(60)] },
      ],
      correo: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(60),
            Validators.email,
          ],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.minLength(8), Validators.maxLength(60)],
        },
      ],
      cambiarPassword: false,
    });
  }

  getUsuario() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((parms) => {
      this.usuariosService.obtenerPorId(parms['id']).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.usuario = response;
          if (response !== undefined) {
            this.form.patchValue(response);
          }
        },
        error: () => {
          this.router.navigate(['/usuarios']);
          this.isLoading = false;
        },
      });
    });
  }

  obtenerErrorGenerico(
    nombreCampo: string,
    nombreMostrar: string,
    minLength?: number,
    maxLength?: number
  ): string {
    return obtenerErroresGenerico(
      nombreCampo,
      nombreMostrar,
      this.form,
      minLength,
      maxLength
    );
  }

  cambiarPasswordCheck() {
    console.log();

    if (this.form.value.cambiarPassword) {
      this.form.get('password').enable();
    } else {
      this.form.get('password').disable();
      this.form.get('password').setValue('');
    }
  }

  guardarCambios() {
    this.isLoading = true;

    let usuarioEditado: UsuarioEditarDTO = {
      idRol: this.form.value.idRol,
      nombre: this.form.value.nombre,
      apellidoPaterno: this.form.value.apellidoPaterno,
      apellidoMaterno: this.form.value.apellidoMaterno,
      correo: this.form.value.correo,
      password: this.form.value.password,
    };

    this.usuariosService.editar(usuarioEditado, this.usuario.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Usuario Actualizado!');
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
