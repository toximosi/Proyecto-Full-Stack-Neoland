import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModule } from 'src/app/models/usuario.module';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  id: number = 0;
  usuario: UsuarioModule[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.Usuario()
      .then(pUsuario => {
        this.usuario = pUsuario;
        //console.log(pUsuario);
      }).catch(error => console.log("Error UsuarioVer: " + error));


    /* this.usuarioService.UsuarioId()
      .then(pUsuario => {
        this.usuario = pUsuario;
        console.log(pUsuario);
      }).catch(error => console.log("Error UsuarioVer: " + error)); */


    /* this.usuarioService.UsuarioVer()
      .then(response => { console.log(response) })
      .catch(error => console.log("Error UsuarioVer: " + error)); */
  }


}
