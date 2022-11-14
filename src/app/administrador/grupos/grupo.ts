export interface GrupoDTO{
    id: number;
    idGrado : number;
    nombreGrado : string;
    nombreNivelEducativo : string;
    nombre : string;
    estado : boolean;
}

export interface GrupoEditarDTO{
    id: number;
    idNivelEducativo: number;
    idGrado : number;
    nombre : string;
}

export interface GrupoCrearDTO{
    idGrado : number;
    nombre : string;
}


export interface GrupoSelectorDTO{
    id: number;
    nombre : string;
}