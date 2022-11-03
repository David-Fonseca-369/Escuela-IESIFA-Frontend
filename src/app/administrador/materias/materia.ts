export interface materiaCrearDTO {
  idGrupo: number;
  nombre: string;
  descripcion: string;
}

export interface materiaDTO {
  id: number;
  idGrupo: number;
  nombreGrupo: string;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface materiaEditarDTO{
    id: number;
    idGrupo : number;
    nombre : string;
    descripcion : string;
}