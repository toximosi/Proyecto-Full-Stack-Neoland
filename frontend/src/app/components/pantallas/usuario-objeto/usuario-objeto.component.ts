import { Component, OnInit, Input } from '@angular/core';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuario-objeto',
  templateUrl: './usuario-objeto.component.html',
  styleUrls: ['./usuario-objeto.component.scss']
})
export class UsuarioObjetoComponent implements OnInit {

  @Input() usuario: any = {};
  @Input() id: number;

  arrObjeto: ObjetoModel[];

  constructor(private objetoService: ObjetoService, private usuarioComponent: UsuarioComponent) { }

  ngOnInit(): void {

    /* this.usuario = this.usuarioComponent.usuario */

    /* this.objetoService.ObjetoVer()
      .then(response => { console.log(response) })
      .catch(error => console.log("Error UsuarioVer: " + error)) ;*/

    this.objetoService.ObjetoVer()
      .then(
        pObjeto => {
          this.arrObjeto = pObjeto;
          //console.log(this.objeto);
        })
      .catch(error => console.log("Error ObjetoVer: " + error))
  }


}
