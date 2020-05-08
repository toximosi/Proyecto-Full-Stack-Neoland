//angular
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
//variables de entorno
import { environment } from '../../../../environments/environment';
import { LoginService } from 'src/app/services/login.service';
//modal ngBootstrap
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class RegistroComponent implements OnInit {
  //emitir información para la visibilidad de los menus
  @Output() menuVisible: EventEmitter<any>;
  estadoMenuRegistro: string;
  estadoMenuUsuario: string;
  //comunicacion Padre-hijo
  private modalRef: NgbModalRef;
  @Output() eventCerrarModal: EventEmitter<any>;
  cerrarModal: boolean;
  //modal
  modal: NgbModalRef;
  //variables
  imgUrl: string = environment.imgUrl
  //variables formulario
  formulario: FormGroup;
  alias: string;
  nombre: string;
  apellidos: string;
  email: string;
  edad: number;
  password: string;
  errorMesage: string;
  foto: string;

  constructor(config: NgbModalConfig,
    private loginService: LoginService,
    private router: Router) {
    //emitir información para la visibilidad de los menus
    this.menuVisible = new EventEmitter();
    //comunicacion externa
    this.eventCerrarModal = new EventEmitter();
    this.cerrarModal = false;
    //inicializacion variables
    this.imgUrl = environment.imgUrl;
    this.errorMesage = null;
    this.foto = this.avatarAleatorio();
    //this.foto = this.avatarAleatorio();
    //ngbootstrap model
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    //formulario
    this.formulario = new FormGroup({
      alias: new FormControl(''),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      edad: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      foto: new FormControl(this.foto)
    });
    this.errorMesage = null;
  }

  ngOnInit(): void { }
  //Funciones ----------------------------------------------------
  avatarAleatorio() {
    const max = 4;
    const al = Math.floor(Math.random() * ((max - 0) + 0));
    const img = `user-avatar-${al}.jpg`;
    return img;
  };
  //formulario
  onSubmit() {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Buscandote :)',
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
    /* console.log(this.formulario.value); */
    this.loginService.registro(this.formulario.value)
      .then((result) => {
        /* {"message": " 👨‍🎤 usuario creado !!!",
          "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSUQiOjIwLCJjcmVhdGVkQXQiOjE1ODg4NzI3ODgsImV4cGlyZWRBdCI6MTU5MDE2ODc4OCwiaWF0IjoxNTg4ODcyNzg4fQ.8DYyg6jFDApS9ka5APcBEZVDLaEhU2Hpanp-H2dKqS4",
          "userId": 20} */
        //*incluimos el valor del token y el id de usuario
        localStorage.setItem('user-token', result['user-token']);
        localStorage.setItem('userId', result['userId']);
        this.entrarSesion();
        //cerrar
        Swal.close();
        this.router.navigateByUrl('/usuario');
      }).catch(error => {
        // console.log({ "error del login": error });
        Swal.fire({
          allowOutsideClick: false,
          title: 'Cachis',
          text: 'ha habido un error en matrix, intentalo más tarde',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        this.ocultarModal();
      });
    //incluir si ha habido un error, si no reenviarle a una ruta:
    //enviarle a una ruta:
    this.router.navigate(['/inicio']);
  }
  ocultarModal() {
    /* console.log(this.modal) */
    this.eventCerrarModal.emit(
      this.modal.close()
    );
    this.modalRef.close();
    /* this.cerrarModal = true; */
  }
  //emitir información para la visibilidad de los menus --------------------------------------
  entrarSesion() {
    this.menuVisible.emit({
      estadoMenuRegistro: 'ocultar',
      estadoMenuUsuario: 'mostrar',
    });
  };

}
