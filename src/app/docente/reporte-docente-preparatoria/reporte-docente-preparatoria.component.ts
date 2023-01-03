import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { CalificacionesService } from 'src/app/services/calificaciones.service';
import { CalificacionesDocentePreparatoriaDTO, CalificacionPreparatoriaDTO } from 'src/app/services/models/calificaciones/calificacion';

@Component({
  selector: 'app-reporte-docente-preparatoria',
  templateUrl: './reporte-docente-preparatoria.component.html',
  styleUrls: ['./reporte-docente-preparatoria.component.css']
})
export class ReporteDocentePreparatoriaComponent implements OnInit {

  isLoading = false;
  errores : string[] = [];
  calificacionesDocente : CalificacionesDocentePreparatoriaDTO;

  columnasAMostrar = [
    'nombre',
    'noCuenta',
    'primeraEvaluacion',
    'segundaEvaluacion',
    'promedio1',
    'terceraEvaluacion',
    'cuartaEvaluacion',
    'promedio2',
    'promedioFinal',
  ];

  constructor(
    private calificacionesService: CalificacionesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerCalificaciones();
  }

  obtenerCalificaciones() {
    this.isLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.calificacionesService
        .calificacionesDocentePreparatoria(params['id'])
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.calificacionesDocente = response;

            console.log(response);
          },
          error: (error) => {
            this.isLoading = false;
            this.errores = parsearErroresAPI(error);
          },
        });
    });
  }

  calcularPromedioFinal(calificacion : CalificacionPreparatoriaDTO) : string{

    let promedio1 = (calificacion.primeraEvaluacion + calificacion.segundaEvaluacion) /2;
    let promedio2 = (calificacion.terceraEvaluacion + calificacion.cuartaEvaluacion) /2;


   return ((promedio1 + promedio2)/2).toFixed(1);

  }

}
