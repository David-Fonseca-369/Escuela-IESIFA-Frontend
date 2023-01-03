import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SecurityService } from 'src/app/security/security.service';
import { CalificacionesService } from 'src/app/services/calificaciones.service';
import {
  CalificacionAltaDTO,
  CalificacionAlumnoRegistrarDTO,
  CalificacionesCreacionDTO,
} from 'src/app/services/models/calificaciones/calificacion';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-lista-alumnos-calificaciones',
  templateUrl: './lista-alumnos-calificaciones.component.html',
  styleUrls: ['./lista-alumnos-calificaciones.component.css'],
})
export class ListaAlumnosCalificacionesComponent implements OnInit {
  @Input()
  datosAltaCalificaciones: CalificacionAltaDTO;

  columnasAMostrar = ['nombre', 'noCuenta', 'calificacion'];
  errores: string[] = [];

  @Output()
  isLoading : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private calificacionesService: CalificacionesService,
    private router: Router,
    private securityService: SecurityService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {}

  asignarCalificacion(calificacion, index: number) {
    this.datosAltaCalificaciones.calificacionesRegistrar[index].calificacion =
      Number(calificacion.value);
  }

  guardar() {
   this.isLoading.emit(true);

    let idDocente = Number(this.securityService.obtenerCampoJWT('idUsuario'));

    const calificacionesCreacion: CalificacionesCreacionDTO = {
      idMateria: this.datosAltaCalificaciones.idMateria,
      idPeriodo: this.datosAltaCalificaciones.idPeriodo,
      idNivelEducativo: this.datosAltaCalificaciones.idNivelEducativo,
      idDocente: idDocente,
      evaluacion: this.datosAltaCalificaciones.evaluacion,
      detalles: this.datosAltaCalificaciones.calificacionesRegistrar,
    };

    this.calificacionesService.crear(calificacionesCreacion).subscribe({
      next: () => {
        this.isLoading.emit(false)
        this.notify.successfulNotification('¡Calificaciones guardadas!');
        this.router.navigate(['/materias-asignadas']);
      },
      error: (error) => {
        this.isLoading.emit(false)
        this.errores = parsearErroresAPI(error);
      },
    });

    console.log(this.datosAltaCalificaciones.calificacionesRegistrar);
  }
}
