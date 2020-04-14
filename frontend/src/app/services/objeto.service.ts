import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjetoModule } from '../models/objeto.module';


@Injectable({
  providedIn: 'root'
})

export class ObjetoService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/objeto';
  }

  ObjetoVer(): Promise<ObjetoModule[]> {
    return this.http.get<ObjetoModule[]>(this.baseUrl).toPromise();
  }

}
