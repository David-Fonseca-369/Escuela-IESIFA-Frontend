import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { grupoCrearDTO, grupoDTO, grupoEditarDTO } from './grupo';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private apiURL = environment.apiURL + 'grupos';

  constructor(private http : HttpClient) { }

  public todos() :Observable<grupoDTO[]>{
    return this.http.get<grupoDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<grupoEditarDTO>{
    return this.http.get<grupoEditarDTO>(`${this.apiURL}/${id}`)
  }

  public crear(grupo : grupoCrearDTO): Observable<any>{
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo : grupoCrearDTO, id: number): Observable<any>{
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }
  
  public activar(id: number): Observable<any>{
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public descativar(id: number): Observable<any>{
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
