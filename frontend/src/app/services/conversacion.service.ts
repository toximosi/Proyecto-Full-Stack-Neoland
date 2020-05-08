import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversacionService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.hostUrl;
  }


  //Conexión son los endpoint de backend ------------------------------------------
  ConversacionVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversacion`).toPromise();
  };

  ConversacionId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversacion/${ID}`).toPromise();
  };

  Conversacion(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversacion-completo`).toPromise();
  };

  ConversacionNuevo(formValue): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/conversacion/nuevo`, formValue).toPromise();
  };

  ConversacionCambiar(formValue): Promise<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/conversacion/cambiar`, formValue).toPromise();
  };

  ConversacionBorrar(ID): Promise<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/conversacion/borrar/${ID}`).toPromise();
  };

  ConversacionCompletaVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversacion-completo`).toPromise();
  };

  ConversacionCompletaId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conversacion-completo/${ID}`).toPromise();
  };

}
