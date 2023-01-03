export interface PeriodoDTO{
  id : number;
  idNivelEducativo : number;
  nombre : string;
  fechaInicio : Date;
  fechaFin : Date;
}

export interface PeriodoCreacionDTO{
  nombre : string;
  fechaInicio : Date;
  fechaFin : Date;
}
