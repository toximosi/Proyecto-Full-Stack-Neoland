import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuario-avatar',
  templateUrl: './usuario-avatar.component.html',
  styleUrls: ['./usuario-avatar.component.scss']
})
export class UsuarioAvatarComponent implements OnInit {

  arrUsuario: UsuarioModel[];
  id: number;

  constructor(private usuarioService: UsuarioService) {
    this.id = 0;
    this.arrUsuario = [];
  }

  async ngOnInit(): Promise<any> {

    this.arrUsuario = await this.usuarioService.UsuarioCompleto();
    /* usuario = this.arrUsuario[this.id]; */

    /* this.usuarioService.UsuarioCompleto()
      .then((pUsuario) => {
        this.arrUsuario = pUsuario;
      })
      .catch(error => console.log("Error UsuarioVer: " + error)); */
  }

}
