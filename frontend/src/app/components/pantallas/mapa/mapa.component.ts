import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent, AgmGeocoder } from '@agm/core';

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
  visitante: number;
  zoom: number;
  direccion: string;

  geocoder: any;
  infowindow: any;

  isFulled = true;
  screenOptions = {
    position: 2
  };

  constructor() { }

  ngOnInit(): void {
    //inicializacion de valores
    this.ObtenerLatLngnUsuarioNavegador(); //para que el mapa se inicie donde esta el usuario, segun el navegador
    this.zoom = 20;
    this.geocoder = new google.maps.Geocoder();
    /* this.infowindow = new google.maps.InfoWindow; */

  }

  private ObtenerLatLngnUsuarioNavegador() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const dire = this.DireccionTxt(this.lat, this.lng);
        console.log("this.DireccionTxt: " + dire)

      });
    };
  }

  private DireccionTxt(plat, pLng) {
    this.geocoder.geocode({ 'location': { lat: plat, lng: pLng } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log('aaaa');
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
  }
}