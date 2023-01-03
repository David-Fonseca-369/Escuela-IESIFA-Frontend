import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { PeriodoDTO } from '../periodo';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-lista-periodos-secundaria',
  templateUrl: './lista-periodos-secundaria.component.html',
  styleUrls: ['./lista-periodos-secundaria.component.css'],
})
export class ListaPeriodosSecundariaComponent implements OnInit {
  isLoading = false;
  periodos: PeriodoDTO[];
  errores: string[] = [];
  form: FormGroup;

  columnasAMostrar = ['nombre', 'periodo'];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(
    private periodosService: PeriodosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obtenerPeriodosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );

    this.loadForm();

    this.form.valueChanges.subscribe((values)=> {
      this.filtrarPeriodos(values);
    })
  }

  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }
  obtenerPeriodosPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.periodosService
      .secundariaPaginacion(pagina, cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<PeriodoDTO[]>) => {
          this.isLoading = false;
          this.periodos = response.body;
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

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerPeriodosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  filtrarPeriodos(values: any) {
    this.isLoading = true;

    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.periodosService.filtrarSecundaria(values).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.periodos = response.body;
        this.cantidadTotalRegistros = response.headers.get('cantidadTotalRegistros');
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error)
      },
    });
  }
}
