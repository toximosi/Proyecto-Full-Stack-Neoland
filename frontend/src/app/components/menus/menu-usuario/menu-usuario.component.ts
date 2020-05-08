//angular
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
//para la conexión con las tablas y la bd
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
//variables de entorno
import { environment } from 'src/environments/environment';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {
  //emitir información para la visibilidad de los menus
  @Output() menuVisible: EventEmitter<any>;
  estadoMenuRegistro: string;
  estadoMenuUsuario: string;
  //Variables
  arrUsuario: UsuarioModel[];
  arrUsuarioId: UsuarioModel[];
  /* usuarioActual: UsuarioModel; */
  id: number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    //emitir información para la visibilidad de los menus
    this.menuVisible = new EventEmitter();
    //inicializamos
    this.arrUsuario = [];
    this.arrUsuarioId = [];
    this.id = parseInt(localStorage.userId);


    /* this.router.events.subscribe(val => {
      this.logeado()
    }); */
  }

  ngOnInit(): void {
    //creamos los datos de los array para poder mostrarlos en html
    this.usuarioService.UsuarioCompletoId(this.id)
      .then(respon => {
        this.arrUsuarioId = respon
        /* console.log(this.arrUsuarioId) */
      })
      .catch(error => console.log(error))
  }

  //Aciones de botones para navegar entre pantallas
  menuNav(ruta) {
    this.router.navigate([ruta]);
  }

  //Desloguearse
  cambiarCookie(pCookie, pValue) {
    document.cookie = pCookie + '=' + pValue + '; Path=/;';
  }
  borrarCookie(pCookie) {
    document.cookie = pCookie + '= Path=/; Expires =Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  LoginOutAlarma() {
    //alarma
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Seguro?',
      text: '¿Quieres dejarnos ya?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Me quedo carabola',
      cancelButtonText: 'Adios caracola',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'nos vemos',
          'te hecharemos de menos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Genial, entonces te quedas',
          'vamos :)',
          'error'
        )
        this.LoginOut();
      }
    })
  };

  LoginOut() {
    //borrar token header
    localStorage.removeItem('user-token');
    localStorage.removeItem('userId');
    //borrar cookie
    this.borrarCookie("cookie_lostthing");
    this.cambiarCookie("userId", "");
    //redirigir a inicio ----------
    this.router.navigate(['inicio']);
    this.salirSesion();
  }

  //emitir información para la visibilidad de los menus --------------------------------------
  salirSesion() {
    this.menuVisible.emit({
      estadoMenuRegistro: 'mostrar',
      estadoMenuUsuario: 'ocultar',
    });
  };

}
