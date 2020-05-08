
export class ObjetoModel {
  ID: number;
  nombre: string;
  foto: string;
  descripcion: string;
  perdido: number;
  encontrado: number;
  fecha_perdido: Date;
  direccion_perdido: string;
  latitud_perdido: number;
  longitud_perdido: number;
  fecha_encontrado: Date;
  latitud_encontrado: number;
  longitud_encontrado: number;
  /* fk_usuario: number; */
  /* fk_objetotipo: number; */
  usuario: {
    ID: number;
    alias: string;
    /* nombre: string; */
    /* apellidos: string; */
    /* edad: number; */
    email: string;
    /*password: string;*/
    foto: string;
    /* fecha_alta: any; */
  }
  tipo: {
    ID: number;
    tipo: string;
    icono: string;
    /* fk_objetofamilia: number; */
    familia:
    {
      ID: number;
      familia: string;
      color: string;
    }
  }
}
