import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { AlumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css'],
})
export class EditarAlumnoComponent implements OnInit {
  isLoading = false;
  hide = true;

  form: FormGroup;
  generos: GeneroDTO[];
  errores: string[] = [];
  grupos: GrupoSelectorDTO[];
  alumno: AlumnoDTO;

  constructor(
    private formBuilder: FormBuilder,
    private generosService: GenerosService,
    private gruposService: GruposService,
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getGeneros();

    //deshabilitar campo password
    this.form.get('password').disable();
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
      password: ['', [Validators.minLength(8), Validators.maxLength(60)]],
      cambiarPassword: false,
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

    this.gruposService
      .gruposSelector()
      .pipe(
        finalize(() => {
          this.obtenerAlumno();
        })
      )
      .subscribe({
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

  cambiarPasswordCheck() {
    console.log();

    if (this.form.value.cambiarPassword) {
      this.form.get('password').enable();
    } else {
      this.form.get('password').disable();
      this.form.get('password').setValue('');
    }
  }

  obtenerAlumno() {
    this.isLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.alumnosService.obtenerPorId(params['id']).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.alumno = response;
          this.form.patchValue(this.alumno);
        },
        error: (error) => {
          this.isLoading = false;

          console.log(error);
          this.router.navigate(['/alumnos']);
        },
      });
    });
  }

  guardarCambios() {
    this.isLoading = true;

    this.alumnosService.editar(this.form.value, this.alumno.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Alumno Actualizado!')
        this.router.navigate(['/alumnos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
