import { Component, OnInit } from '@angular/core';
import { ObjetoService } from 'src/app/services/objeto.service';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss']
})
export class ObjetoComponent implements OnInit {

  arrObjeto: ObjetoModel[];
  objetoSeleccionado: number;

  //ID: number;
  //Mapa---------------------------------->

  lat: number;
  lng: number;
  zoom: number;
  direccion: void;
  estado: string;
  geocoder: any;
  imagen: string;
  styleMark: any;

  constructor(private objetoService: ObjetoService) {
    this.arrObjeto = []
    this.objetoSeleccionado = 0;
    this.estado;
  }

  async ngOnInit(): Promise<any> {

    this.arrObjeto = await this.objetoService.ObjetoCompleto();

    console.log(this.arrObjeto)

    //Mapa ------------------------------------>

    this.lat;
    this.lng;
    this.direccion;
    this.zoom = 19;
    this.imagen = `icon-aqui.png`;
    this.styleMark = {
      width: '50px',
      border: '10px solid red'

    }
  }

  mandarID(pID) {
    /* console.log(pID); */
    /* this.arrObjetoVer = this.objetoService.ObjetoId(pID).then((res) => { this.arrObjetoVer = res }); */
    /* this.objetoService.ObjetoId(pID).then((res) => { this.arrObjetoVer = res }); */
    this.objetoSeleccionado = pID;
    /* console.log(this.arrObjetoVer); */
  }

  //Mapa --------------------------------------------------------->
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.direccion = this.DireccionTxt(this.lat, this.lng);
      })
    }
  }
  private DireccionTxt(plat, pLng) {
    this.geocoder.geocode({ 'location': { lat: plat, lng: pLng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.direccion = results[0].formatted_address;
          // this.searchElementRef.nativeElement.value = results[0].formatted_address);
          // console.log(this.searchElementRef.nativeElement.value);
          // infowindow.setContent(results[0].formatted_address);
          //console.log(this.direccion);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      };
    });
  };

}
