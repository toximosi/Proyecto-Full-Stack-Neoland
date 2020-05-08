import { Component, OnInit } from '@angular/core';
//Variables de entorno
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  //variables
  bg: string;
  urlImg: string;

  constructor() {
    this.urlImg = environment.imgUrl;
    this.bg = `${this.urlImg}/bg-inicio.jpg`;
  }

  ngOnInit(): void {
    /* /** The enabled/disabled state of the Fullscreen control. */
    /* fullscreenControl ?: boolean; */
    /** The display options for the Fullscreen control. */
    /* fullscreenControlOptions ?: FullscreenControlOptions; */
    /** */
  }

}
