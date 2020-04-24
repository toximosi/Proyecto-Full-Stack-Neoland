import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent, AgmGeocoder } from '@agm/core';
import { FicticioModel } from 'src/app/models/ficticio.model';
import { FicticioService } from 'src/app/services/ficticio.service';


/* import { GoogleMap } from '@angular/google-maps'; */
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  //declaracoin de variables

  lat: number;
  lng: number;
  imagen: string;
  urlimg: string = "../../../assets/img/";

  ficticio: FicticioModel[];
  arrFicticio: FicticioModel[];
  numficticio: number = 15;

  visitante: number;
  zoom: number;
  direccion: string;

  geocoder: any;
  infowindow: any;

  isFulled = true;
  screenOptions = {
    position: 2
  };

  constructor(private ficticioSerivice: FicticioService) {
    this.ficticio = [];
  }

  async ngOnInit() {
    //inicializacion de valores
    this.arrFicticio = await this.ficticioSerivice.FicticioVer();
    this.zoom = 20;
    this.geocoder = new google.maps.Geocoder();
    this.imagen = `${this.urlimg}icon-aqui.png`;
    //funciones
    this.ObtenerLatLngnUsuarioNavegador(); //para que el mapa se inicie donde esta el usuario, segun el navegador
    /* this.infowindow = new google.maps.InfoWindow; */
    /*    this.MarcaAleatoria(); */
    setTimeout(this.MarcaAleatoria.bind(this), 3000);
  }

  private ObtenerLatLngnUsuarioNavegador() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const dire = this.DireccionTxt(this.lat, this.lng);
        /* console.log("this.DireccionTxt: " + dire) */

      });
    };
  }

  private MarcaAleatoria() {

    for (let i = 0; i <= this.numficticio; i++) {
      const objetnum = Math.random() * ((0 - this.arrFicticio.length) + this.arrFicticio.length);
      console.log("this.arrFicticio.length" + this.arrFicticio.length);
      console.log("objetonum" + objetnum);
      const newCoor = this.Coordenadas(this.lat, this.lng)
      /* const newLat = this.lat + (Math.random() * (0.0005 - 0.00005));
      const newLng = this.lng + (Math.random() * (0.0005 - 0.00005)); */

      const ficticionew = new FicticioModel(newCoor[0], newCoor[1]);
      ficticionew.nombre = this.arrFicticio[objetnum].nombre;
      ficticionew.foto = this.urlimg + this.arrFicticio[objetnum].foto;
      ficticionew.icono = this.urlimg + this.arrFicticio[objetnum].icono;
      ficticionew.descripcion = this.arrFicticio[objetnum].descripcion;
      /*  ficticionew.direccion = this.DireccionTxt(ficticionew.latitud, ficticionew.longitud); */
      this.ficticio.push(ficticionew);

      /* console.log(this.ficticio); */
    };
    /* for (let i = 0; i < this.arrFicticio.length; i++) {
         const newLat = this.lat + (Math.random() * (0.0005 - 0.00005));
       const newLng = this.lng + (Math.random() * (0.0005 - 0.00005));
     
       const ficticio1 = new FicticioModel(newLat, newLng);
       ficticio1.nombre = this.arrFicticio[0].nombre;
       ficticio1.foto = this.urlimg + this.arrFicticio[0].foto;
       ficticio1.icono = this.urlimg + this.arrFicticio[0].icono;
       ficticio1.descripcion = this.arrFicticio[0].descripcion;
     
       this.ficticio.push(ficticio1);
     
       console.log(this.ficticio);} */
  }
  private Coordenadas(lat, lng) {
    const r = 100 / 111300 // = 100 meters
    const y0 = lat;
    const x0 = lng;
    const u = Math.random()
    const v = Math.random()
    const w = r * Math.sqrt(u)
    const t = 2 * Math.PI * v
    const x = w * Math.cos(t)
    const y1 = w * Math.sin(t)
    const x1 = x / Math.cos(y0)

    const newY = y0 + y1
    const newX = x0 + x1
    return (new Array(newY, newX));

  }

  private DireccionTxt(plat, pLng) {
    this.geocoder.geocode({ 'location': { lat: plat, lng: pLng } }, (results, status) => {
      /* console.log(results);
      console.log(status); */
      if (status === 'OK') {
        if (results[0]) {
          /* console.log('aaaa'); */
          this.direccion = results[0].formatted_address;
          // this.searchElementRef.nativeElement.value = results[0].formatted_address);
          // console.log(this.searchElementRef.nativeElement.value);
          // infowindow.setContent(results[0].formatted_address);
          console.log(this.direccion);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  };





}