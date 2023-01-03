import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MateriaDTO } from 'src/app/administrador/materias/materia';
import { MateriasService } from 'src/app/administrador/materias/materias.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-materias-asignadas',
  templateUrl: './materias-asignadas.component.html',
  styleUrls: ['./materias-asignadas.component.css'],
})
export class MateriasAsignadasComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  materias: MateriaDTO[];
  errores: string[] = [];

  columnasAMostrar = ['nombre', 'nombreGrupo', 'opciones'];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  constructor(
    private formBuilder: FormBuilder,
    private materiasService: MateriasService,
    private securityService : SecurityService
  ) {}

  ngOnInit(): void {
    this.obtenerMateriasPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.loadForm();

    this.form.valueChanges.subscribe((values)=> {
      this.searchMaterias(values);
    })
  }

  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }

  obtenerMateriasPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {

    this.isLoading = true;

    let idUsuario = Number(this.securityService.obtenerCampoJWT('idUsuario'));

    this.materiasService
      .asignadasPaginacion(pagina, cantidadRegistrosAMostrar, idUsuario)
      .subscribe({
        next: (response: HttpResponse<MateriaDTO[]>) => {
          this.isLoading = false;
          this.materias = response.body;
          this.cantidadTotalRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );

          console.log(response.body);
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

  getNombre(): string{
    let nombre = localStorage.getItem('nombre');
    let apellidoPaterno  = localStorage.getItem('apellidoPaterno');
    let apellidoMaterno = localStorage.getItem('apellidoMaterno');


    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`
  }

  searchMaterias(values:any){

    this.isLoading = true;
    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    let idUsuario = Number(this.securityService.obtenerCampoJWT('idUsuario'));

    this.materiasService.asignadasFiltrar(idUsuario, values)
    .subscribe({
      next: (response : HttpResponse<MateriaDTO[]>)=> {
        this.materias = response.body;
        this.cantidadTotalRegistros = response.headers.get('cantidadTotalRegistros');
        this.isLoading = false
      }
    })

  }

}
