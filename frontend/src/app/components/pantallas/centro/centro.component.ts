import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent, AgmGeocoder, InfoWindowManager } from '@agm/core';
import { NumberSymbol } from '@angular/common';
import { FormControl } from '@angular/forms';
//variables universales---------------------> environment
import { environment } from '../../../../environments/environment';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';

declare var google;

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.scss']
})
export class CentroComponent implements OnInit {
  //declaracoin de variables
  @ViewChild('search')
  public searchElementRef: ElementRef;
  //plaza callao
  lat: number = 40.420099;
  lng: number = -3.705697;
  direccion: void;
  zoom: number;
  //datos mapa

  latlongs: any = [];
  latlong: any = {};
  searchControl: FormControl;
  geocoder: any;
  infowindow: any;
  isFulled = true;
  screenOptions = {
    position: 2
  };
  //Marca inicial:
  imagen: string;
  //modelo array bd
  arrObjeto: ObjetoModel[];
  objetoSeleccionado: number;//para identificarlo en el html

  constructor(
    private objetoService: ObjetoService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    /*     this.ficticio = []; */
    /*     this.urlimg = environment.imgUrl; */
  }

  async ngOnInit() {
    //inicializacion de valores
    //mapa
    //plaza callao
    this.lat;
    this.lng;
    this.direccion;
    this.zoom = 17;
    this.imagen = `icon-aqui.png`;
    /* 
        this.searchControl = new FormControl;
        this.geocoder = new google.maps.Geocoder(); */
    //funciones iniciales
    //*Lo he anulado para que no haga llamadas cada vez que se carga: 
    //this.setCurrentPosition();//---> modificado para que nos de Callao
    this.arrObjeto = await this.objetoService.ObjetoCompleto();
    this.objetoSeleccionado = 0;
    //*Lo he anulado para que no haga llamadas cada vez que se carga:
    /* setTimeout(this.ObjetoColocar.bind(this), 2000); */
  }

  /*   private ObjetoColocar() {
      for (let i = 0; i <= this.arrObjeto.length; i++) {
        const obj = this.arrObjeto;
        if ((obj[i].perdido == 1 && obj[i].encontrado == 1)
          || (obj[i].perdido == 1 && obj[i].encontrado == 0)) {
          this.lat = obj[i].latitud_perdido;
          this.lat = obj[i].longitud_perdido;
        } else {
          this.lat = obj[i].latitud_encontrado;
          this.lat = obj[i].longitud_encontrado;
        }
  
      }
    } */

  /* private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.direccion = this.DireccionTxt(this.lat, this.lng);
      })
    }
  }*/





  /*   private DireccionTxt(plat, pLng) {
      this.geocoder.geocode({ 'location': { lat: plat, lng: pLng } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
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
        };
      });
    }; */

  onMouseOver2(infoWindow, gm) {
    /* this.infoWindowManager.addInfoWindow(infoWindow); */
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

}
