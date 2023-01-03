import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoCrearDTO, AlumnoDTO, AlumnoEditarDTO } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private apiURL = environment.apiURL + 'alumnos';

  constructor(private http : HttpClient) { }

  public todosPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/todosPaginacion`, {
      observe: 'response',
      params,
    });
  }


  public alumnosGrupo(
    idGrupo : number,
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/alumnosGrupo/${idGrupo}`, {
      observe: 'response',
      params,
    });
  }

  public alumnosGrupoFiltrar(idGrupo: number, values: any) : Observable<any>{
    const params = new HttpParams({ fromObject: values});

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/alumnosGrupoFiltrar/${idGrupo}`, {
      params,
      observe: 'response'
    })
  }

  public filtrar(values: any) : Observable<any>{
    const params = new HttpParams({ fromObject: values});

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/filtrar`, {
      params,
      observe: 'response'
    })
  }



  public obtenerPorId(id: number): Observable<AlumnoDTO> {
    return this.http.get<AlumnoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: AlumnoCrearDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo: AlumnoEditarDTO, id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public descativar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }



}
