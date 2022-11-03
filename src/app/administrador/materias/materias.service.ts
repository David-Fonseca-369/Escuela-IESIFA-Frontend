import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { materiaCrearDTO, materiaDTO, materiaEditarDTO } from './materia';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiURL = environment.apiURL + 'materias';

  constructor(private http : HttpClient) { }

  public todosPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<materiaDTO[]>(`${this.apiURL}/todosPaginacion`,{ observe: 'response', params});
  }

  public obtenerPorId(id: number): Observable<materiaEditarDTO> {
    return this.http.get<materiaEditarDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: materiaCrearDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo: materiaCrearDTO, id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public descativar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }

}
