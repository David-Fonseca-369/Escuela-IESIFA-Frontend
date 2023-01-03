import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';
import { AlumnoDTO } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit {
  isLoading = false;
  alumnos: AlumnoDTO[];
  errores: string[] = [];
  form: FormGroup;

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  columnasAMostrar = ['nombre', 'nombreGrupo', 'correo','noCuenta', 'estado', 'opciones'];

  constructor(
    private alumnosService: AlumnosService,
    private notify: NotifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.obtenerAlumnosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );

    this.loadForm();


    this.form.valueChanges.subscribe((values) => {
      this.searchAlumnos(values)
    })
  }

  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }


  searchAlumnos(values:any){

    this.isLoading = true;
    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.alumnosService.filtrar(values).subscribe({
      next: (response)=> {
        this.alumnos = response.body;
        this.cantidadTotalRegistros = response.headers.get('cantidadTotalRegistros');
        this.isLoading = false
      }
    })

  }

  obtenerAlumnosPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.alumnosService
      .todosPaginacion(pagina, cantidadRegistrosAMostrar)
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
  }

  confirmarActivar(idAlumno: number) {
    Swal.fire({
      title: 'Activar',
      text: '¿Estás seguro?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#071A4E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      iconColor: '#6A6A6C',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activar(idAlumno);
      }
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerAlumnosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  activar(idAlumno: number) {
    this.isLoading = true;
    this.alumnosService.activar(idAlumno).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerAlumnosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
        this.notify.successfulNotification('¡Activado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  confirmarDesactivar(idAlumno: number) {
    Swal.fire({
      title: 'Desactivar',
      text: '¿Estás seguro?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#071A4E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      iconColor: '#6A6A6C',
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivar(idAlumno);
      }
    });
  }

  desactivar(idAlumno: number) {
    this.isLoading = true;

    this.alumnosService.descativar(idAlumno).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerAlumnosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
        this.notify.successfulNotification('¡Desactivado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }


}
