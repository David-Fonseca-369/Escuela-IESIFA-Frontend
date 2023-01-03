import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeriodoCreacionDTO, PeriodoDTO } from './periodo';

@Injectable({
  providedIn: 'root',
})
export class PeriodosService {
  private apiURL = environment.apiURL + 'periodos';

  constructor(private http: HttpClient) {}

  public secundariaPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<PeriodoDTO[]>(`${this.apiURL}/secundariaPaginacion`, {
      observe: 'response',
      params,
    });
  }

  public filtrarSecundaria(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<PeriodoDTO[]>(`${this.apiURL}/filtrarSecundaria`, {
      params,
      observe: 'response',
    });
  }

  public preparatoriaPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<PeriodoDTO[]>(
      `${this.apiURL}/preparatoriaPaginacion`,
      { observe: 'response', params }
    );
  }

  public filtrarPreparatoria(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<PeriodoDTO[]>(`${this.apiURL}/filtrarPreparatoria`, {
      params,
      observe: 'response',
    });
  }

  public crearPeriodoSecundaria(periodo: PeriodoCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crearPeriodoSecundaria`, periodo);
  }

  public crearPeriodoPreparatoria(
    periodo: PeriodoCreacionDTO
  ): Observable<any> {
    return this.http.post(`${this.apiURL}/crearPeriodoPreparatoria`, periodo);
  }

  public periodoActualSecundaria(): Observable<PeriodoDTO> {
    return this.http.get<PeriodoDTO>(`${this.apiURL}/periodoActualSecundaria`);
  }

  public periodoActualPreparatoria(): Observable<PeriodoDTO> {
    return this.http.get<PeriodoDTO>(
      `${this.apiURL}/periodoActualPreparatoria`
    );
  }
}
