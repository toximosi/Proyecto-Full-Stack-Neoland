import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ConversacionModule {
  ID: number;
  emisor: number;
  receptor: number;
  asunto: string;
  fecha_inicio: any;
  fk_usuario: number;
  mensajes:
    {
      ID: number;
      emisor: number;
      fecha: any;
      texto: string;
      fk_conversacion: number;
    };
}
