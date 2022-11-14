import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolDTO } from './models/roles/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiURL = environment.apiURL + 'roles';
  constructor(private http : HttpClient) { }

  public getRoles(): Observable<RolDTO[]>{
    return this.http.get<RolDTO[]>(`${this.apiURL}`)
  }
}
