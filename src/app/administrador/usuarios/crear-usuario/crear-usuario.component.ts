import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { obtenerErroresGenerico, parsearErroresAPI } from 'src/app/helpers/helpers';
import { RolDTO } from 'src/app/services/models/roles/rol';
import { NotifyService } from 'src/app/services/notify.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  roles: RolDTO[];

  form: FormGroup;
  hide  = true;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private notify : NotifyService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.loadForm();
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
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(60),
          ],
        },
      ],
    });
  }

  getRoles() {
    this.isLoading = true;

    this.rolesService.getRoles().subscribe({
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

  guardar() {

    this.isLoading = true;

    this.usuariosService.crear(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification("¡Usuario Creado!");
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  obtenerErrorGenerico(nombreCampo : string, nombreMostrar:string, minLength?:number, maxLength?: number): string{  
  return obtenerErroresGenerico(nombreCampo,nombreMostrar, this.form, minLength, maxLength );
  }
}
