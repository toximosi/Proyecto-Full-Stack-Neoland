import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FicticioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.hostUrl;
  }

  FicticioVer(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ficticio`).toPromise();
  };

  FicticioId(ID): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ficticio/${ID}`).toPromise();
  };

  FicticioNuevo(formValue): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/ficticio/nuevo`, formValue).toPromise();
  };

  FicticioCambiar(formValue): Promise<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/ficticio/cambiar`, formValue).toPromise();
  };

  FicticioBorrar(ID): Promise<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/ficticio/borrar/${ID}`).toPromise();
  };

}
