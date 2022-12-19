import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { UsuarioDTO } from '../../usuarios/usuario';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { MateriaDTO } from '../materia';

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
  materiasAsignadas: MateriaDTO[];

  columnasAMostrar = ['nombre', 'nombreGrupo', 'estado', 'opciones'];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  docentes: UsuarioDTO[];

  constructor(
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
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

    this.usuariosService.docentes().subscribe({
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

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    // this.obtenerMateriasPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
}
