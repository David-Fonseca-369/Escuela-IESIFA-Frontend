import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MateriaCrearDTO, MateriaDTO, MateriaEditarDTO } from './materia';

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

    return this.http.get<MateriaDTO[]>(`${this.apiURL}/todosPaginacion`,{ observe: 'response', params});
  }

  public filtrar(values: any) : Observable<any>{
    const params = new HttpParams({ fromObject: values});

    return this.http.get<MateriaDTO[]>(`${this.apiURL}/filtrar`, {
      params,
      observe: 'response'
    })
  }


  public obtenerPorId(id: number): Observable<MateriaEditarDTO> {
    return this.http.get<MateriaEditarDTO>(`${this.apiURL}/${id}`);
  }

  public crear(grupo: MateriaCrearDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, grupo);
  }
  public editar(grupo: MateriaCrearDTO, id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, grupo);
  }

  public activar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number): Observable<any> {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }

  public asignadasPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idDocente: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<MateriaDTO[]>(`${this.apiURL}/asignadasPaginacion/${idDocente}`,{ observe: 'response', params});
  }

  public disponiblesPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<MateriaDTO[]>(`${this.apiURL}/disponiblesPaginacion`,{ observe: 'response', params});
  }

  public asignar(idMateria:number, idDocente:number):Observable<any>{
    return this.http.put(`${this.apiURL}/asignar/${idMateria}/${idDocente}`, null)
  }

  public quitar(idMateria : number) : Observable<any>{
    return this.http.put(`${this.apiURL}/quitar/${idMateria}`, null)
  }

}
