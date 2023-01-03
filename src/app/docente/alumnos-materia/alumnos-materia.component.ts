import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AlumnoDTO } from 'src/app/administrador/alumnos/alumno';
import { AlumnosService } from 'src/app/administrador/alumnos/alumnos.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-alumnos-materia',
  templateUrl: './alumnos-materia.component.html',
  styleUrls: ['./alumnos-materia.component.css'],
})
export class AlumnosMateriaComponent implements OnInit {
  isLoading = false;
  alumnos: AlumnoDTO[];
  errores: string[] = [];
  form: FormGroup;

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 50;

  columnasAMostrar = ['nombre', 'nombreGrupo', 'correo', 'noCuenta'];

  nombreMateria: string = null;
  nombreGrupo: string = null;

  constructor(
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.obtenerAlumnos(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.loadForm();
    this.form.valueChanges.subscribe((values) => {
      this.searchAlumnos(values);
    });


  }

  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }
  obtenerAlumnos(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.alumnosService
        .alumnosGrupo(params['id'], pagina, cantidadRegistrosAMostrar)
        .subscribe({
          next: (response: HttpResponse<AlumnoDTO[]>) => {
            this.isLoading = false;

            this.alumnos = response.body;

            console.log(this.alumnos);
            this.cantidadTotalRegistros = response.headers.get(
              'cantidadTotalRegistros'
            );
          },
          error: (error) => {
            this.isLoading = false;
            this.errores = parsearErroresAPI(error);
          },
        });
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerAlumnos(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  searchAlumnos(values: any) {
    this.isLoading = true;
    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.activatedRoute.params.subscribe((params) => {
      this.alumnosService.alumnosGrupoFiltrar(params['id'], values).subscribe({
        next: (response) => {
          this.alumnos = response.body;
          this.cantidadTotalRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );
          this.isLoading = false;
        },
      });
    });
  }

  obtenerDatos() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.nombreMateria = params['materia'];
        this.nombreGrupo = params['grupo'];

        console.log('obtiene datos')
      },
    });
  }
}
