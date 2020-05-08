import { Component, OnInit, Input } from '@angular/core';
import { ConversacionService } from 'src/app/services/conversacion.service';
import { ConversacionModel } from 'src/app/models/conversacion.model';
import { MensajeModel } from 'src/app/models/mensaje.model';
import { MensajeService } from 'src/app/services/mensaje.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-conversacion',
  templateUrl: './usuario-conversacion.component.html',
  styleUrls: ['./usuario-conversacion.component.scss']
})
export class UsuarioConversacionComponent implements OnInit {
  //variables
  id: number;
  imgUrl: string;
  arrUsuario: UsuarioModel[];
  arrConversacion: ConversacionModel[];
  arrMensajes: any[];
  arrConversacionRecivida: any;
  arrConversacionEnviada: any;
  arrMensajeSolo: MensajeModel[];
  arrConversacionId: any[];
  arrConversacionSeleccionada: any;

  //variables para transferir al formulario
  formularioMensaje: FormGroup;
  conversacionId: number;
  emisorId: number;
  receptorId: number;

  constructor(private usuarioService: UsuarioService,
    private conversacionService: ConversacionService,
    private mensajeService: MensajeService) {
    //inicializar variables
    this.id = parseInt(localStorage.userId);
    this.imgUrl = environment.imgUrl;
    this.arrConversacionRecivida = [];
    this.arrConversacionEnviada = [];

    this.arrConversacionId = [];
    this.arrConversacionSeleccionada = [];

    this.arrUsuario = [];

    //formulario
    this.conversacionId = 0;
    this.emisorId;
    this.receptorId;

    this.formularioMensaje = new FormGroup({
      emisor: new FormControl(''),
      texto: new FormControl(''),
      fk_conversacion: new FormControl(''),
    });
  }

  ngOnInit(): void {
    //inicializar valores
    this.usuarioService.UsuarioCompletoId(this.id).then(result => {
      this.arrUsuario = result
      this.arrConversacionRecivida = this.arrUsuario[0].conversacionesRecibida;
      this.arrConversacionEnviada = this.arrUsuario[0].conversacionesEnviada;
    });

    this.conversacionService.Conversacion()
      .then(
        (pConversacion) => {
          this.arrConversacion = pConversacion;
          this.arrMensajes = pConversacion[this.id].mensajes;
        }).catch(error => console.log("Error ConversacionId: " + error));
  };
  ConversacionId(pID) {
    this.conversacionService.ConversacionCompletaId(pID)
      .then((result) => {
        this.arrConversacionSeleccionada = (result);
        console.log(this.arrConversacionSeleccionada)
      })
      .catch(error => console.log(error));
  };

  RecogerInformacion(pEmisor, pReceptor, pID) {
    this.emisorId = pEmisor;
    this.receptorId = pReceptor;
    this.ConversacionId(pID);
    /*console.log('emisorId: ' + this.emisorId);
    console.log('receptorId: ' + this.receptorId);
    console.log('conversacionId: ' + this.conversacionId);
    console.log(this.arrConversacionSeleccionada); */
  };

  onSubmit() {
    //alarma
    Swal.fire({
      allowOutsideClick: false,
      title: 'Enviando palabritas',
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

    const form = this.formularioMensaje.value;
    form.emisor = this.receptorId;
    form.fk_conversacion = this.arrConversacionSeleccionada[0].ID;
    /* form.fk_conversacion = parseInt(form.fk_conversacion); */
    /* console.log(this.formularioMensaje.value) */
    /*  console.log(form); */
    this.mensajeService.MensajeNuevo(form)
      .then((resolve) => {
        //alarma
        Swal.fire({
          allowOutsideClick: false,
          title: 'Corto y Cambio',
          text: 'Aquí agila parda, Tu mensaje ha sido enviado',
          icon: 'success',
          confirmButtonText: 'Cerrar',
        });
      }).catch((error) => {
        //alarma
        Swal.fire({
          allowOutsideClick: false,
          title: 'No estas registrado',
          text: error[0],
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        console.log(error);
      });
  };

};
