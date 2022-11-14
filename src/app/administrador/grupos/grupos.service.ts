import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoCrearDTO, GrupoDTO, GrupoEditarDTO, GrupoSelectorDTO } from './grupo';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  private apiURL = environment.apiURL + 'grupos';

  constructor(private http: HttpClient) {}

  public todos(): Observable<GrupoDTO[]> {
    return this.http.get<GrupoDTO[]>(`${this.apiURL}/todos`);
  }

  public todosPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<GrupoDTO[]>(`${this.apiURL}/todosPaginacion`,{ observe: 'response', params});
  }

  public gruposSelector(): Observable<GrupoSelectorDTO[]>{
return this.http.get<GrupoSelectorDTO[]>(`${this.apiURL}/gruposSelector`)
  }

  public obtenerPorId(id: number): Observable<GrupoEditarDTO> {
    return this.http.get<GrupoEditarDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: GrupoCrearDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo: GrupoCrearDTO, id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public descativar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
