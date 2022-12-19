import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';
import { MateriaDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css'],
})
export class ListaMateriasComponent implements OnInit {
  isLoading = false;
  materias: MateriaDTO[];
  errores: string[] = [];
  form : FormGroup;

  columnasAMostrar = ['nombre', 'nombreGrupo', 'estado', 'opciones'];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private materiasService: MateriasService,
    private notify : NotifyService,
    private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.obtenerMateriasPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );

    this.loadForm();

    this.form.valueChanges.subscribe((values)=> {
      this.searchMaterias(values)
    })

  }

  loadForm(){
    this.form = this.formBuilder.group({
      text : ''
    });

  }

  obtenerMateriasPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.materiasService
      .todosPaginacion(pagina, cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<MateriaDTO[]>) => {
          this.isLoading = false;

          this.materias = response.body;
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

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerMateriasPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);

  }

  confirmarActivar(idMateria: number) {
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
        this.activar(idMateria);
      }
    });
  }

  activar(idMateria: number) {
    this.isLoading = true;
    this.materiasService.activar(idMateria).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerMateriasPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Activado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  confirmarDesactivar(idMateria: number) {
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
        this.desactivar(idMateria);
      }
    });
  }

  desactivar(idMateria: number) {
    this.isLoading = true;
    this.materiasService.desactivar(idMateria).subscribe({
      next: () => {
        this.isLoading = false;
        this.obtenerMateriasPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.notify.successfulNotification('¡Desactivado!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  searchMaterias(values:any){
    
    this.isLoading = true;
    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.materiasService.filtrar(values).subscribe({
      next: (response)=> {
        this.materias = response.body;
        this.cantidadTotalRegistros = response.headers.get('cantidadTotalRegistros');
        this.isLoading = false
      }
    })

  }




}
