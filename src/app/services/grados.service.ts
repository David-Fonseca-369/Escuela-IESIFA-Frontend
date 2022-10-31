import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { gradoSelectorDTO } from './models/grados/grado';

@Injectable({
  providedIn: 'root',
})
export class GradosService {
  private apiURL = environment.apiURL + 'grados';
  constructor(private http: HttpClient) {}

  public gradosSelector(idNivelEducativo : number): Observable<gradoSelectorDTO[]> {
    return this.http.get<gradoSelectorDTO[]>(`${this.apiURL}/gradosSelector/${idNivelEducativo}`);
  }
}
