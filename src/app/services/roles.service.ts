import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { rolDTO } from './models/roles/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiURL = environment.apiURL + 'roles';
  constructor(private http : HttpClient) { }

  public getRoles(): Observable<rolDTO[]>{
    return this.http.get<rolDTO[]>(`${this.apiURL}`)
  }
}
