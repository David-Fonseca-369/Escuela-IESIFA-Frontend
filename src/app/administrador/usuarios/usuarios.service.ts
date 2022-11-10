import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { usuarioCreacionDTO, usuarioDTO, usuarioEditarDTO } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiURL = environment.apiURL + 'usuarios'

  constructor(private http : HttpClient) { }

  public todosPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<usuarioDTO[]>(`${this.apiURL}/todosPaginacion`,{ observe: 'response', params});
  }

  // public obtenerPorId(id: number): Observable<usuarioEditarDTO> {
  //   return this.http.get<usuarioEditarDTO>(`${this.apiURL}/${id}`);
  // }

  public crear(grupo: usuarioCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo: usuarioEditarDTO, id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public descativar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }

}
