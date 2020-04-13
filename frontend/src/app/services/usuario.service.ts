import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/usuario';
  }
  UsuarioVer(): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl).toPromise();
  }
}
