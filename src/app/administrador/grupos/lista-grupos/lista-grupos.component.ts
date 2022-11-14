import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';
import { GrupoDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css'],
})
export class ListaGruposComponent implements OnInit {
  isLoading = false;
  grupos: GrupoDTO[];
  errores: string[] = [];
  columnasAMostrar = [
    'nombre',
    'nombreGrado',
    'nombreNivelEducativo',
    'estado',
    'opciones',
  ];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(
    private gruposService: GruposService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.obtenerGruposPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  obtenerGruposPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.gruposService
      .todosPaginacion(pagina, cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<GrupoDTO[]>) => {
          this.isLoading = false;

          this.grupos = response.body;
          this.cantidadTotalRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );

          console.log(this.grupos)

        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }


  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerGruposPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  confirmarActivar(idGrupo: number) {
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
        this.activar(idGrupo);
      }
    });
  }

  activar(idGrupo: number) {
    this.isLoading = true;
    this.gruposService.activar(idGrupo).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerGruposPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Activado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  confirmarDesactivar(idGrupo: number) {
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
        this.desactivar(idGrupo);
      }
    });
  }

  desactivar(idGrupo: number) {
    this.isLoading = true;
    this.gruposService.descativar(idGrupo).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerGruposPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Desactivado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
