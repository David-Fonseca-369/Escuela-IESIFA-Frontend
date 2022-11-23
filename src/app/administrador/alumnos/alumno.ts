export interface AlumnoDTO{
    id: number;
    idGrupo : number;
    nombreGrupo : string;
    idGenero : number;
    nombreGenero : string;
    nombre : string;
    apellidoPaterno : string;
    apellidoMaterno : string;
    curp : string;
    telefono : string;
    direccion : string;
    nombreTutor : string;
    telefonoTutor : string;
    direccionTutor: string;
    correo : string;
    estado :boolean;
}

export interface AlumnoCrearDTO{

    idGrupo : number;
    idGenero : number;
    nombre : string;
    apellidoPaterno : string;
    apellidoMaterno : string;
    curp : string;
    telefono : string;
    direccion : string;
    nombreTutor : string;
    telefonoTutor : string;
    direccionTutor: string;
    correo : string;
    password : string;    
}


export interface AlumnoEditarDTO{    
    idGrupo : number;
    idGenero : number;
    nombre : string;
    apellidoPaterno : string;
    apellidoMaterno : string;
    curp : string;
    telefono : string;
    direccion : string;
    nombreTutor : string;
    telefonoTutor : string;
    direccionTutor: string;
    correo : string;
    password : string;      
}