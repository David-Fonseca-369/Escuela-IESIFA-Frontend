import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nivelEducativoDTO } from './models/niveles-educativos/nivelEducativo';

@Injectable({
  providedIn: 'root',
})
export class NivelEducativoService {
  private apiURL = environment.apiURL + 'nivelesEducativos';

  constructor(private http: HttpClient) {}

  public todos(): Observable<nivelEducativoDTO[]> {
    return this.http.get<nivelEducativoDTO[]>(`${this.apiURL}/todos`);
  }
}
