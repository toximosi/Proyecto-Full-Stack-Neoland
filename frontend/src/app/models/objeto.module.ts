import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ObjetoModule {
  ID: number;
  nombre: string;
  foto: string;
  descripcion: string;
  perdido: number;
  encontrado: number;
  fecha_perdida: any;
  latitud_perdida: number;
  longitud_perdida: number;
  fecha_encontrado: any;
  latitud_encontrado: number;
  longitud_encontrado: number;
  fk_usuario: number;
  fk_objetotipo: number;
}
