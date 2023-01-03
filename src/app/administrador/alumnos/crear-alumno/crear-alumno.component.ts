import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { GenerosService } from 'src/app/services/generos.service';
import { GeneroDTO } from 'src/app/services/models/genero';
import { NotifyService } from 'src/app/services/notify.service';
import { GrupoSelectorDTO } from '../../grupos/grupo';
import { GruposService } from '../../grupos/grupos.service';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})
export class CrearAlumnoComponent implements OnInit {
  isLoading = false;
  hide = true;

  form: FormGroup;
  generos: GeneroDTO[];
  errores: string[] = [];
  grupos: GrupoSelectorDTO[];


  constructor(
    private formBuilder: FormBuilder,
    private generosService: GenerosService,
    private gruposService: GruposService,
    private alumnosService: AlumnosService,
    private notify: NotifyService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getGeneros();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idGrupo: ['', Validators.required],
      idGenero: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(60)]],
      noCuenta: ['', [Validators.required, Validators.maxLength(60)]],
      curp: [
        '',
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18),
        ],
      ],
      telefono: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(255)]],
      nombreTutor: ['', Validators.maxLength(60)],
      telefonoTutor: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      direccionTutor: ['', Validators.maxLength(255)],
      correo: [
        '',
        [Validators.required, Validators.maxLength(60), Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
    });
  }

  getGeneros() {
    this.isLoading = true;
    this.generosService
      .todos()
      .pipe(
        finalize(() => {
          this.getGrupos();
        })
      )
      .subscribe({
        next: (response) => {
          this.generos = response;
          this.isLoading = false;

          console.log(this.generos);
        },
        error: (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        },
      });
  }

  getGrupos() {
    this.isLoading = true;

    this.gruposService.gruposSelector().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.grupos = response;
        console.log(this.grupos);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
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

  guardar() {
    this.isLoading = true;

    this.alumnosService.crear(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Alumno Creado!');
        this.router.navigate(['/alumnos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
