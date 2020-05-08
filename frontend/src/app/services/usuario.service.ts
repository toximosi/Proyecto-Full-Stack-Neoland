import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.hostUrl;
  }

  //Conexión son los endpoint de backend ------------------------------------------
  UsuarioVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario`).toPromise();
  };

  UsuarioId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${ID}`).toPromise();
  };

  UsuarioCompleto(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario-completo`).toPromise();
  };

  UsuarioCompletoId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario-completo/${ID}`).toPromise();
  };

  UsuarioNuevo(formValue): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/usuario/nuevo`, formValue).toPromise();
  };

  UsuarioCambiar(formValue): Promise<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/usuario/cambiar`, formValue).toPromise();
  };

  UsuarioBorrar(ID): Promise<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/usuario/borrar/${ID}`).toPromise();
  };


  //Modificando las llamadas son los endpoint de backend ------------------------------------------

  /* UsuariogetId(pid) {
    return new Promise((resolve, reject) => {
  const
    })
  }*/

} 
