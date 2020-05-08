import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.hostUrl;
  }

  //Conexión son los endpoint de backend ------------------------------------------
  MensajeVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mensaje`).toPromise();
  };

  MensajeVerId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mensaje/${ID}`).toPromise();
  };

  MensajeNuevo(formValue): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/mensaje/nuevo`, formValue).toPromise();
  };

  MensajeCambiar(formValue): Promise<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/mensaje/cambiar`, formValue).toPromise();
  };

  MensajeBorrar(ID): Promise<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/mensaje/borrar/${ID}`).toPromise();
  };
}

