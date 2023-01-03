import { DecimalPipe } from "@angular/common";

export interface CalificacionAltaDTO{

  idMateria : number;
  nombreMateria : string;

  idGrupo : number;
  nombreGrupo : string;

  idGrado : number;
  nombreGrado : string;

  idNivelEducativo : number;
  nombreNivelEducativo : string;

  idPeriodo : number;
  nombrePeriodo : string;

  evaluacion : number;

 calificacionesRegistrar : CalificacionAlumnoRegistrarDTO[];


}

export interface CalificacionAlumnoRegistrarDTO{
  idAlumno  : number;
  nombre : string;
  noCuenta : string;
  calificacion : number;
}


export interface CalificacionesCreacionDTO{
  idMateria : number;
  idPeriodo : number;
  idNivelEducativo : number;
  idDocente : number;
  evaluacion : number;

  detalles : CalificacionAlumnoCreacionDTO[];

}

export interface CalificacionAlumnoCreacionDTO{
  idAlumno : number;
  nombre : string;
  noCuenta : string;
  calificacion : number;
}


export interface CalificacionesDocenteSecundariaDTO{
  idMateria : number;
  nombreMateria : string;

  idGrupo : number;
  nombreGrupo : string;

  idGrado : number;
  nombreGrado : string;

  idNivelEducativo : number;
  nombreNivelEducativo : string;

  idPeriodo : number;
  nombrePeriodo : string;

  evaluacion : number;

  calificaciones : CalificacionSecundariaDTO[];

}

export interface CalificacionSecundariaDTO{
  nombre : string;
  noCuenta : string;
  primeraEvaluacion : number;
  segundaEvaluacion : number;
  terceraEvaluacion : number;
  cuartaEvaluacion : number;
  quintaEvaluacion : number;
}


export interface CalificacionesDocentePreparatoriaDTO{
  idMateria : number;
  nombreMateria : string;

  idGrupo : number;
  nombreGrupo : string;

  idGrado : number;
  nombreGrado : string;

  idNivelEducativo : number;
  nombreNivelEducativo : string;

  idPeriodo : number;
  nombrePeriodo : string;

  evaluacion : number;

  calificaciones : CalificacionPreparatoriaDTO[];

}

export interface CalificacionPreparatoriaDTO{
  nombre : string;
  noCuenta : string;
  primeraEvaluacion : number;
  segundaEvaluacion : number;
  terceraEvaluacion : number;
  cuartaEvaluacion : number;
}
