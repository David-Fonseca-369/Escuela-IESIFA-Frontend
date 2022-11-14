import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GradoSelectorDTO } from './models/grados/grado';

@Injectable({
  providedIn: 'root',
})
export class GradosService {
  private apiURL = environment.apiURL + 'grados';
  constructor(private http: HttpClient) {}

  public gradosSelector(idNivelEducativo : number): Observable<GradoSelectorDTO[]> {
    return this.http.get<GradoSelectorDTO[]>(`${this.apiURL}/gradosSelector/${idNivelEducativo}`);
  }
}
