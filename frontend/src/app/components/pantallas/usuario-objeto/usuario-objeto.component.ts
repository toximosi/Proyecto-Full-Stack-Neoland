//Angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//componentes
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
//variables de entorno
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-objeto',
  templateUrl: './usuario-objeto.component.html',
  styleUrls: ['./usuario-objeto.component.scss']
})
export class UsuarioObjetoComponent implements OnInit {
  //variables

  imgUrl: string;
  id: number;

  arrUsuarioID: UsuarioModel[];
  arrUsuarioObjPerdido: any;
  arrUsuarioObjEncontrado: any;

  arrObjeto: ObjetoModel[];
  objetoId: number;

  constructor(
    private usuarioService: UsuarioService,
    private activeRouter: ActivatedRoute,
    private objetoService: ObjetoService) {
    //iniciacización
    this.imgUrl = environment.imgUrl;

    this.arrUsuarioID = [];
    this.arrUsuarioObjPerdido = []
    this.arrUsuarioObjEncontrado = []
    this.id = parseInt(localStorage.userId);
    //Conoder Id usaurio por el params de la URl
    /* this.activeRouter.queryParamMap.subscribe((paraMap) => console.log(paraMap));
    console.log(this.id) */
  }

  ngOnInit(): void {
    //obtener la información del uusario
    this.usuarioService.UsuarioCompletoId(this.id)
      .then(((result) => {
        this.arrUsuarioID = result;
        this.arrUsuarioObjPerdido = this.arrUsuarioID[0].objetoPerdido;
        this.arrUsuarioObjEncontrado = this.arrUsuarioID[0].objetoEncontrado;
        /* console.log(this.arrUsuarioID)
        console.log(this.arrUsuarioObjEncontrado);
        console.log(this.arrUsuarioObjPerdido); */
      }))
      .catch(error => console.log(error))

    this.objetoService.ObjetoCompleto()
      .then(result => this.arrObjeto = result)
      .catch(error => console.log(error))

  }

  mandarID(pID) {
    this.objetoId = pID;
  }

}
