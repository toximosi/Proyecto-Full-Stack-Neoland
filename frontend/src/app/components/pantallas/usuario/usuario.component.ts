import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  id: number;
  arrUsuario: UsuarioModel[];

  constructor(private usuarioService: UsuarioService) {
    this.arrUsuario = [];
    this.id = 0;
  }

  ngOnInit(): void {

    /* this.usuarioService.UsuarioId(this.id)
      .then(pUsuario => {
        this.arrUsuario = pUsuario;
        console.log(pUsuario);
      }).catch(error => console.log("Error UsuarioVer: " + error));
    console.log */

    /* this.usuarioService.Usuario()
          .then(pUsuario => {
            this.arrUsuario = pUsuario;
            //console.log(pUsuario);
          }).catch(error => console.log("Error UsuarioVer: " + error)); */

  }


}
