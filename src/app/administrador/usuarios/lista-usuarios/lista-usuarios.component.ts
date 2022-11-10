import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  isLoading = false;
  usuarios : usuarioDTO[];

    //paginacion
    cantidadTotalRegistros;
    paginaActual = 1;
    cantidadRegistrosAMostrar = 10;

    errores : string[] = [];

    columnasAMostrar = ['nombre', 'nombreRol', 'correo', 'estado', 'opciones']

  constructor(private usuariosService : UsuariosService,
    private notify : NotifyService) { }

  ngOnInit(): void {

    this.obtenerUsuariosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  
  obtenerUsuariosPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.usuariosService
      .todosPaginacion(pagina, cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<usuarioDTO[]>) => {
          this.isLoading = false;

          this.usuarios = response.body;

          console.log(this.usuarios);
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

  confirmarActivar(idUsuario: number) {
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
        this.activar(idUsuario);
      }
    });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerUsuariosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  activar(idUsuario: number) {
    this.isLoading = true;
    this.usuariosService.activar(idUsuario).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerUsuariosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Activado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  confirmarDesactivar(idUsuario: number) {
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
        this.desactivar(idUsuario);
      }
    });
  }

  desactivar(idUsuario: number) {
    this.isLoading = true;

    this.usuariosService.descativar(idUsuario).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerUsuariosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Desactivado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }



}
