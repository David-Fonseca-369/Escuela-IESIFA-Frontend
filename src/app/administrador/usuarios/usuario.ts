export interface UsuarioDTO {
  id: number;
  idRol: number;
  nombreRol: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  estado: boolean;
}

export interface UsuarioCreacionDTO {
  idRol: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo : string;
  password : string;

}


export interface UsuarioEditarDTO {
    idRol: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo : string;
    password : string;
    
  }
  