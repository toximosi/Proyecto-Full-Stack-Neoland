import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Para saber si el usuario esta loquedo o no

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  //presentamos las variables ----------------------------------------------------
  baseUrl: string;
  estaLogueado: boolean = false;

  constructor(private http: HttpClient) {
    //inicializo las varibles ----------------------------------------------------
    this.baseUrl = 'http://localhost:3000';
  }

  //Funciones ----------------------------------------------------
  login(formValue): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, formValue).toPromise();
  }
}
