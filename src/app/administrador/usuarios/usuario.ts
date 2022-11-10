export interface usuarioDTO {
  id: number;
  idRol: number;
  nombreRol: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  estado: boolean;
}

export interface usuarioCreacionDTO {
  idRol: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo : string;
  password : string;

}


export interface usuarioEditarDTO {
    idRol: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo : string;
    password : string;
    
  }
  