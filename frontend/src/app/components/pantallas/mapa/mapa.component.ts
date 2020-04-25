import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent, AgmGeocoder } from '@agm/core';
import { FicticioModel } from 'src/app/models/ficticio.model';
import { FicticioService } from 'src/app/services/ficticio.service';
import { NumberSymbol } from '@angular/common';
import { FormControl } from '@angular/forms';
//import { } from 'googlemaps';

/* import { GoogleMap } from '@angular/google-maps'; */
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  //declaracoin de variables

  @ViewChild('search')
  public searchElementRef: ElementRef;
  //plaza callao
  lat: number = 40.4196577;
  lng: number = -3.70707;
  direccion: void;
  zoom: number;

  latlongs: any = [];
  latlong: any = {};
  searchControl: FormControl;

  imagen: string;
  urlimg: string = "../../../assets/img/";

  ficticio: FicticioModel[];
  arrFicticio: FicticioModel[];
  numficticio: number = 10;

  visitante: number;

  geocoder: any;
  infowindow: any;

  isFulled = true;
  screenOptions = {
    position: 2
  };

  constructor(private ficticioSerivice: FicticioService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.ficticio = [];
  }

  async ngOnInit() {
    //inicializacion de valores
    //plaza callao
    this.lat;
    this.lng;
    this.direccion;
    this.zoom = 19;
    this.imagen = `${this.urlimg}icon-aqui.png`;

    this.searchControl = new FormControl;
    this.geocoder = new google.maps.Geocoder();
    //funciones iniciales
    //*Lo he anulado para que no haga llamadas cada vez que se carga: 
    this.setCurrentPosition();//para que el mapa se inicie donde esta el usuario, segun el navegador
    //buscador de localizacion
    this.Buscador();
    this.arrFicticio = await this.ficticioSerivice.FicticioVer();
    //*Lo he anulado para que no haga llamadas cada vez que se carga:
    setTimeout(this.MarcaAleatoria.bind(this), 2000);
  }

  private Buscador() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: { 'country': 'es' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          };
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.direccion = this.DireccionTxt(this.lat, this.lng);
          setTimeout(this.MarcaAleatoria.bind(this), 2000);
          this.searchControl.reset();
        });
      });
    });
  }

  private BuscadorRepetirMarcador() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: { 'country': 'es' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          };
          const latlong = {
            latitude: place.geometry.location.lat(),
            longitud: place.geometry.location.lng()
          };
          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
    //! Incluir este marcador para que se vayan añadiendo marcadores:
    /* <agm-marker[latitude]="lat"[longitude] = "lng"[iconUrl] = "imagen"[zIndex] = "100" >
      <agm-info - window * ngFor="let latlong of latlongs"[latitude] = "latlong.latitude"[longitude] = "latlong.longitude" >
        Tu, turu ru<br>: P
          < /agm-info-window>
          < /agm-marker> */
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.direccion = this.DireccionTxt(this.lat, this.lng);
      })
    }
  }

  private MarcaAleatoria() {

    for (let i = 0; i <= this.numficticio; i++) {
      const objetnum = Math.floor(Math.random() * ((this.arrFicticio.length - 0) + 0));
      const newCoor = this.Coordenadas(this.lat, this.lng)
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
    /* const r = 100 / 111300 // = 100 meters */
    const r = 100 / 90000
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
  };

}