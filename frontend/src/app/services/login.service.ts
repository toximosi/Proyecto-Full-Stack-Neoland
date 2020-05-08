//angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
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
    this.baseUrl = environment.hostUrl;

  }

  //Llamadas ----------------------------------------------------

  login(formValue): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, formValue).toPromise();
  }

  registro(formValue): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario/registro`, formValue).toPromise();
  }


}
