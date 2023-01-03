import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CalificacionAltaDTO,
  CalificacionesCreacionDTO,
  CalificacionesDocentePreparatoriaDTO,
  CalificacionesDocenteSecundariaDTO,
} from './models/calificaciones/calificacion';

@Injectable({
  providedIn: 'root',
})
export class CalificacionesService {
  private apiURL = environment.apiURL + 'calificaciones';

  constructor(private http: HttpClient) {}

  public calificacionParaAlta(
    idMateria: number
  ): Observable<CalificacionAltaDTO> {
    return this.http.get<CalificacionAltaDTO>(
      `${this.apiURL}/calificacionParaAlta/${idMateria}`
    );
  }

  public crear(
    calificacionesCreacionDTO: CalificacionesCreacionDTO
  ): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, calificacionesCreacionDTO);
  }

  public calificacionesDocenteSecundaria(
    idMateria: number
  ): Observable<CalificacionesDocenteSecundariaDTO> {
    return this.http.get<CalificacionesDocenteSecundariaDTO>(
      `${this.apiURL}/calificacionesDocenteSecundaria/${idMateria}`
    );
  }

  public calificacionesDocentePreparatoria(
    idMateria: number
  ): Observable<CalificacionesDocentePreparatoriaDTO> {
    return this.http.get<CalificacionesDocentePreparatoriaDTO>(
      `${this.apiURL}/calificacionesDocentePreparatoria/${idMateria}`
    );
  }
}
