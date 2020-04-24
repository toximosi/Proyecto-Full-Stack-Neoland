export class FicticioModel {

  ID: number;
  nombre: string;
  foto: string;
  icono: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  direccion: any;

  constructor(platitud, plongitud) {
    this.latitud = platitud;
    this.longitud = plongitud;
  }

}
