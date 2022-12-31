import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../../usuarios/usuario';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { MateriaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-materias-docentes',
  templateUrl: './materias-docentes.component.html',
  styleUrls: ['./materias-docentes.component.css'],
})
export class MateriasDocentesComponent implements OnInit {
  errores: string[] = [];
  isLoading = false;
  form: FormGroup;
  materiasDisponibles: MateriaDTO[];
  materiasAsignadas: MateriaDTO[] = [];

  columnasAMostrar = ['nombre', 'nombreGrupo', 'opciones'];

  //paginacion Disponibles
  cantidadTotalRegistrosMateriasDisponibles;
  paginaActualMateriasDisponibles = 1;
  cantidadRegistrosAMostrarMateriasDisponibles = 10;

  //paginacion Asignadas
  cantidadTotalRegistrosMateriasAsignadas;
  paginaActualMateriasAsignadas = 1;
  cantidadRegistrosAMostrarMateriasAsignadas = 10;

  idDocenteSeleccionado: number;
  docentes: UsuarioDTO[];

  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private materiasService: MateriasService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.obtenerDocentes();
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idDocente: '',
    });
  }

  obtenerDocentes() {
    this.isLoading = true;

    this.usuariosService
      .docentes()
      .pipe(
        finalize(() => {
          this.obtenerMateriasDisponibles(
            this.paginaActualMateriasDisponibles,
            this.cantidadRegistrosAMostrarMateriasDisponibles
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.docentes = response;
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  obtenerMateriasDisponibles(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    this.isLoading = true;
    this.materiasService
      .disponiblesPaginacion(pagina, cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<MateriaDTO[]>) => {
          this.isLoading = false;
          this.materiasDisponibles = response.body;
          console.log(response.body);
          this.cantidadTotalRegistrosMateriasDisponibles = response.headers.get(
            'cantidadTotalRegistros'
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  obtenerMateriasAsignadas(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idDocente: number,
    materiAsignada: boolean
  ) {
    this.isLoading = true;

    this.materiasService
      .asignadasPaginacion(pagina, cantidadRegistrosAMostrar, idDocente)
      .pipe(
        finalize(() => {
          //solo cargar si una materia a sido asignada, para actualizar
          if (materiAsignada) {
            console.log('cargar por que materia se asigno');
            this.obtenerMateriasDisponibles(
              this.paginaActualMateriasDisponibles,
              this.cantidadRegistrosAMostrarMateriasDisponibles
            );
          }
        })
      )
      .subscribe({
        next: (response: HttpResponse<MateriaDTO[]>) => {
          this.isLoading = false;
          this.materiasAsignadas = response.body;
          console.log(response.body);
          this.cantidadTotalRegistrosMateriasAsignadas = response.headers.get(
            'cantidadTotalRegistros'
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  actualizarPaginacionMateriasDisponibles(datos: PageEvent) {
    this.paginaActualMateriasDisponibles = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrarMateriasDisponibles = datos.pageSize;

    this.obtenerMateriasDisponibles(
      this.paginaActualMateriasDisponibles,
      this.cantidadRegistrosAMostrarMateriasDisponibles
    );
  }

  actualizarPaginacionMateriasAsignadas(datos: PageEvent) {
    this.paginaActualMateriasAsignadas = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrarMateriasAsignadas = datos.pageSize;

    this.obtenerMateriasAsignadas(
      this.paginaActualMateriasAsignadas,
      this.cantidadRegistrosAMostrarMateriasAsignadas,
      this.idDocenteSeleccionado,
      false
    );

    console.log(this.idDocenteSeleccionado);
  }

  buscarMateriasAsignadas(event: any) {
    this.obtenerMateriasAsignadas(
      this.paginaActualMateriasAsignadas,
      this.cantidadRegistrosAMostrarMateriasAsignadas,
      event,
      false
    );
  }

  asignarMateria(idMateria: number) {
    if (this.idDocenteSeleccionado) {
      this.isLoading = true;
      this.materiasService
        .asignar(idMateria, this.idDocenteSeleccionado)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.notify.successfulNotification('¡Materia asignada!');

            //el último parámetro se deja en 'true', para que actualice las materias disponibles.
            this.obtenerMateriasAsignadas(
              this.paginaActualMateriasDisponibles,
              this.cantidadRegistrosAMostrarMateriasDisponibles,
              this.idDocenteSeleccionado,
              true
            );
          },
          error: (error) => {
            this.isLoading = false;
            this.errores = parsearErroresAPI(error);
          },
        });
    } else {
      this.notify.errorNotification('Seleccione un docente');
    }
  }

  quitarMateria(idMateria: number) {
    if (this.idDocenteSeleccionado) {
      this.isLoading = true;

      this.materiasService.quitar(idMateria).subscribe({
        next: () => {
          this.isLoading = false;
          this.notify.successfulNotification('¡Materia disponible!');
          //el último parámetro se deja en 'true', para que actualice las materias disponibles.
          this.obtenerMateriasAsignadas(
            this.paginaActualMateriasDisponibles,
            this.cantidadRegistrosAMostrarMateriasDisponibles,
            this.idDocenteSeleccionado,
            true
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
    } else {
      this.notify.errorNotification('Seleccione un docente');
    }
  }
}
