export interface MateriaCrearDTO {
  idGrupo: number;
  nombre: string;
  descripcion: string;
}

export interface MateriaDTO {
  id: number;
  idGrupo: number;
  nombreGrupo: string;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface MateriaEditarDTO{
    id: number;
    idGrupo : number;
    nombre : string;
    descripcion : string;
}