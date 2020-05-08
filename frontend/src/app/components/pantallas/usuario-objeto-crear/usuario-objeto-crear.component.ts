import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, MouseEvent, AgmGeocoder, InfoWindowManager } from '@agm/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { ObjetoService } from 'src/app/services/objeto.service';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
//alertas
import Swal from 'sweetalert2';

declare var google;

@Component({
  selector: 'app-usuario-objeto-crear',
  templateUrl: './usuario-objeto-crear.component.html',
  styleUrls: ['./usuario-objeto-crear.component.scss']
})
export class UsuarioObjetoCrearComponent implements OnInit {
  //declaracoin de variables
  @ViewChild('search')
  public searchElementRef: ElementRef;
  //variables
  imgUrl: string;
  id: number;
  arrObjeto: ObjetoModel;
  arrUsuarioId: UsuarioModel[];

  //formulario
  formObjetoCrear: FormGroup;
  //mapa
  //declaracoin de variables
  //plaza callao
  lat: number = 40.4196577;
  lng: number = -3.70707;
  direccion: void;
  zoom: number;

  latlongs: any = [];
  latlong: any = {};
  searchControl: FormControl;

  imagen: string;
  /*   urlimg: string;//envirment. */
  geocoder: any;
  infowindow: any;

  isFulled = true;
  screenOptions = {
    position: 2
  };

  constructor(private objetoService: ObjetoService,
    private usuarioService: UsuarioService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    //inicialización variables
    this.id = parseInt(localStorage.userId);
    this.imgUrl = environment.imgUrl;
    this.arrUsuarioId = [];
    //fomrulario
    this.formObjetoCrear = new FormGroup({
      nombre: new FormControl(''),
      foto: new FormControl('objeto.png'),
      descripcion: new FormControl(''),
      perdido: new FormControl(1),
      encontrado: new FormControl(0),
      direccion_perdido: new FormControl(this.direccion),
      fecha_perdido: new FormControl(''),
      latitud_perdido: new FormControl(this.lat),
      longitud_perdido: new FormControl(this.lng),
      fecha_encontrado: new FormControl(''),
      latitud_encontrado: new FormControl(''),
      longitud_encontrado: new FormControl(''),
    });
  }

  async ngOnInit() {
    //inicializacion de valores
    //plaza callao
    this.lat;
    this.lng;
    this.direccion;
    this.zoom = 19;
    this.imagen = `icon-aqui.png`;

    this.searchControl = new FormControl;
    this.geocoder = new google.maps.Geocoder();


    this.usuarioService.UsuarioCompletoId(this.id)
      .then(result => this.arrUsuarioId = result)
      .catch(error => console.log(error))
    //funciones iniciales
    //*Lo he anulado para que no haga llamadas cada vez que se carga: 
    this.setCurrentPosition();//para que el mapa se inicie donde esta el usuario, segun el navegador
    //buscador de localizacion
    this.Buscador();
  }
  //envio del formulario
  onSubmit() {
    //alarma
    Swal.fire({
      allowOutsideClick: false,
      title: 'Preparando localizador',
      text: '',
      icon: 'question',
      confirmButtonText: 'Cool',
      backdrop: `
            rgba(0,0,123,0.4)
            url("${this.imgUrl}/nyan-cat.gif")
            left top
            no-repeat`
    });
    Swal.showLoading();
    //creamos oonstantes, para reducir la escritura
    const form = this.formObjetoCrear.value;
    //formObjetoCrear tra más values de las que necesitamos
    form.perdido = parseInt(form.perdido)
    form.encontrado = parseInt(form.encontrado)
    form.fk_usuario = this.id;
    form.direccion_perdido = this.direccion;
    form.latitud_perdido = this.lat;
    form.longitud_perdido = this.lng;
    form.fk_usuario = this.id;
    /* if (form.direccion_perdido == '') {
      form.direccion_perdido = this.direccion;
    } */
    /* console.log(this.formObjetoCrear.value); */
    this.objetoService.ObjetoNuevo(form)
      .then((resolve) => {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Genial',
          text: 'Tu Objeto ya esta en activo, con suerte alguien lo habrá encontrado',
          icon: 'success',
          confirmButtonText: 'Cerrar',
        });
      }).catch((error) => {
        //alarma
        Swal.fire({
          allowOutsideClick: false,
          title: 'houston tenemos un problema!!!',
          text: 'Parece irónico, pero hemos perdido tu objeto, intentalo más tarde',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      })
  }
  // mapa--------------------------------------------------------------
  //Buscador de direcciónes del mapa
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
          /* setTimeout(this.MarcaAleatoria.bind(this), 2000); */
          /* this.searchControl.reset(); */
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
          /* this.searchControl.reset(); */
        });
      });
    });
  }
  //ppara localizar la posicion actual
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.direccion = this.DireccionTxt(this.lat, this.lng);
      })
    }
  }
  //para recoger la dirección anctual
  private DireccionTxt(plat, pLng) {
    this.geocoder.geocode({ 'location': { lat: plat, lng: pLng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.direccion = results[0].formatted_address;
          // this.searchElementRef.nativeElement.value = results[0].formatted_address);
          // console.log(this.searchElementRef.nativeElement.value);
          // infowindow.setContent(results[0].formatted_address);
          /* console.log(this.direccion); */
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      };
    });
  };



}