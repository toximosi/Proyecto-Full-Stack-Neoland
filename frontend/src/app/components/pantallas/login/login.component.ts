//angular
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
//formualario
import { FormControl, FormGroup } from '@angular/forms';
//componetes, servicios,...
import { LoginService } from 'src/app/services/login.service';
//variables de entorno
import { environment } from 'src/environments/environment';
//modal ngBootstrap
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class LoginComponent implements OnInit {
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
  imgUrl: string;
  //formulario
  formulario: FormGroup;
  nombre: string;
  email: string;
  password: string;
  errorMesage: string;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
  ) {
    //emitir información para la visibilidad de los menus
    this.menuVisible = new EventEmitter();
    //comunicacion externa
    this.eventCerrarModal = new EventEmitter();
    this.cerrarModal = false;
    //inicializacion variables
    this.imgUrl = environment.imgUrl;
    this.errorMesage = null;
    //ngbootstrap model
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    //formulario
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });

  };

  ngOnInit(): void { }

  //Funciones ----------------------------------------------------
  //formulario
  onSubmit() {
    //alarma
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

    this.loginService.login(this.formulario.value).then((result) => {
      //console.log(result);//la consola regresa: Object { message: "👍 Ok, tu contraseña coincide - Estás autorizado", "user-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE1ODg3MDUzODQsImV4cGlyZWRBdCI6MTU5MDAwMTM4NCwiaWF0IjoxNTg4NzA1Mzg0fQ.x-A3JMbzcQohSir4NpJ3I_tbo-UVbItqAGZ2rSEdQS0", userId: 2 }//que es lo que mandamos desde el backend
      //*incluimos el valor del token y el id de usuario
      localStorage.setItem('user-token', result['user-token']);
      localStorage.setItem('userId', result['userId']);
      this.entrarSesion();
      //cerrar 
      Swal.close();
      this.router.navigateByUrl('/usuario');
    }).catch(error => {
      // console.log({ "error del login": error });
      //alarma
      Swal.fire({
        allowOutsideClick: false,
        title: 'No estas registrado',
        text: error[0],
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      //oculatar modal
      this.ocultarModal();
    });
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
