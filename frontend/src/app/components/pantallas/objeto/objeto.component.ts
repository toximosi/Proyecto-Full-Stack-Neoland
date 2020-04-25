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

  //Mapa---------------------------------->
  lat: number;
  lng: number;
  zoom: number;
  direccion: void;
  geocoder: any;
  imagen: string;

  constructor(private objetoService: ObjetoService) {
    this.arrObjeto = [];
  }

  async ngOnInit(): Promise<any> {

    this.arrObjeto = await this.objetoService.ObjetoCompleto();
    console.log(this.arrObjeto);

    //Mapa ------------------------------------>
    this.lat;
    this.lng;
    this.direccion;
    this.zoom = 19;
    this.imagen = `icon-aqui.png`;
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
