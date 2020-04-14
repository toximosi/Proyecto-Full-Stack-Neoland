import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UsuarioModule {

  ID: number;
  alias: string;
  nombre: string;
  apellidos: string;
  edad: number;
  email: string;
  password: string;
  avatar: string;
  fecha_alta: any;
  objetos: {
    ID: number;
    nombre: string;
    foto: string;
    descripcion: string;
    perdido: number;
    encontrado: number;
    fecha_perdida: any;
    latitud_perdida: number;
    longitud_perdida: number;
    fecha_encontrado: null;
    latitud_encontrado: null;
    longitud_encontrado: null;
    fk_usuario: number;
    fk_objetotipo: number;
    familia: {
      ID: number;
      familia: string;
      color: string;
      fk_objeto: number;
      tipo:
      {
        ID: number;
        tipo: string;
        icono: string;
        fk_objetofamilia: number;
      };
    };

  };
  conversacionesRecibida:
    {
      ID: number;
      emisor: number;
      receptor: number;
      asunto: string;
      fecha_inicio: any;
      fk_usuario: number;
      mensajes: {
        ID: number;
        emisor: number;
        fecha: any;
        texto: string;
        fk_conversacion: number;
      };
    }
  conversacionesEnviada:
    {
      ID: number;
      emisor: number;
      receptor: number;
      asunto: string;
      fecha_inicio: any;
      fk_usuario: number;
      mensajes: {
        ID: number;
        emisor: number;
        fecha: any;
        texto: string;
        fk_conversacion: number;
      };
    };
};
