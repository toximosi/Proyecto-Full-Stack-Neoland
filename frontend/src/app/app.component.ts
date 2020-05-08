//angular
import { Component, OnInit } from '@angular/core';
//modal ngBootstrap
/* import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /* providers: [NgbModalConfig, NgbModal], */
})

export class AppComponent implements OnInit {
  title = 'frontend';
  //variables
  //class
  estadoLogin: string;
  estadoRegistro: string;
  estadoMenuRegistro: string;
  estadoMenuUsuario: string;
  LogeadoEstado: any;

  constructor() {
    this.estadoLogin = 'mostrar';
    this.estadoRegistro = 'mostrar';
    this.LogeadoEstado = localStorage.getItem('userId');

    if (this.LogeadoEstado == null) {
      this.estadoMenuRegistro = 'mostrar';
      this.estadoMenuUsuario = 'ocultar';
    } else {
      this.estadoMenuRegistro = 'ocultar';
      this.estadoMenuUsuario = 'mostrar';
    }

    console.log('this.LogeadoEstado: ' + this.LogeadoEstado);
  }
  ngOnInit(): void {
    //mosatar elementos si el usuario esta logueado
  }

  //Recibir información de los hijos --------------------------------------
  //Del componete registro y del componete login
  cambiarMenu($event) {
    this.estadoMenuRegistro = $event.estadoMeRegistro;
    this.estadoMenuUsuario = $event.estadoMenuUsuario;
  }






}
