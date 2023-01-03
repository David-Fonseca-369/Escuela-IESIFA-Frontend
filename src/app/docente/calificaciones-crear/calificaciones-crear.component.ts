import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { CalificacionesService } from 'src/app/services/calificaciones.service';
import { CalificacionAltaDTO } from 'src/app/services/models/calificaciones/calificacion';

@Component({
  selector: 'app-calificaciones-crear',
  templateUrl: './calificaciones-crear.component.html',
  styleUrls: ['./calificaciones-crear.component.css'],
})
export class CalificacionesCrearComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  calificacionesParaAlta: CalificacionAltaDTO;

  constructor(
    private calificacionesService: CalificacionesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerCalificacionParaAlta();
  }

  obtenerCalificacionParaAlta() {
    this.isLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.calificacionesService.calificacionParaAlta(params['id']).subscribe({
        next: (response) => {
          this.isLoading = false;

          this.calificacionesParaAlta = response;
          console.log(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
    });
  }

  checkSpinner(event: any) {
    this.isLoading = event;
  }
}
