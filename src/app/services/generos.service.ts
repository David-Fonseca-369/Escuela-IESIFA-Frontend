import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneroDTO } from './models/genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiURL = environment.apiURL + 'generos';
  constructor( private http: HttpClient) { }

  public todos(): Observable<GeneroDTO[]>{
    return this.http.get<GeneroDTO[]>(`${this.apiURL}/todos`);
  }
}
