import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelEducativoDTO } from './models/niveles-educativos/nivelEducativo';

@Injectable({
  providedIn: 'root',
})
export class NivelEducativoService {
  private apiURL = environment.apiURL + 'nivelesEducativos';

  constructor(private http: HttpClient) {}

  public todos(): Observable<NivelEducativoDTO[]> {
    return this.http.get<NivelEducativoDTO[]>(`${this.apiURL}/todos`);
  }
}
