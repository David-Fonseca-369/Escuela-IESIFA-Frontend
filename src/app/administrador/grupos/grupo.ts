export interface grupoDTO{
    id: number;
    idGrado : number;
    nombreGrado : string;
    nombreNivelEducativo : string;
    nombre : string;
    estado : boolean;
}

export interface grupoEditarDTO{
    id: number;
    idNivelEducativo: number;
    idGrado : number;
    nombre : string;
}

export interface grupoCrearDTO{
    idGrado : number;
    nombre : string;
}
