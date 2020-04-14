import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }
  UsuarioVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario`).toPromise();
  }
  Usuario(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario-completo`).toPromise();
  }

  UsuarioId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${ID}`).toPromise();
  }

}
