
export class MensajeModel {
  mensajes:
    {
      ID: number;
      emisor: number;
      fecha: any;
      texto: string;
      fk_conversacion: number;
    };
}
