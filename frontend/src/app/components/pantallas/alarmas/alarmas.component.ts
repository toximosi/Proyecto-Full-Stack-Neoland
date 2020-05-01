import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrls: ['./alarmas.component.scss']
})
export class AlarmasComponent implements OnInit {
  prueba: string;
  constructor() {
    this.prueba = "hola";
  }

  ngOnInit(): void {
  }

}
