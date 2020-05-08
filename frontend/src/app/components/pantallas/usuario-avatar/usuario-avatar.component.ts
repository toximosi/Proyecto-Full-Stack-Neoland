//angular
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//para la conexión con las tablas y la bd
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
//variables de entorno
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-avatar',
  templateUrl: './usuario-avatar.component.html',
  styleUrls: ['./usuario-avatar.component.scss']
})
export class UsuarioAvatarComponent implements OnInit {
  //Variables
  arrUsuario: UsuarioModel[];
  arrUsuarioId: UsuarioModel[];
  /* usuarioActual: UsuarioModel; */
  id: number;

  constructor(
    private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    //inicializamos
    this.arrUsuario = [];
    this.arrUsuarioId = [];
    this.id = parseInt(localStorage.userId);
    /*  this.usuarioActual; */
    //detectar los elemntos variables de la url
    /* this.activateRoute.params.subscribe((params) => {
      this.id = parseInt(params.usuarioID);
    }); */
  }
  ngOnInit() {
    //creamos los datos de los array para poder mostrarlos en html
    this.usuarioService.UsuarioCompletoId(this.id)
      .then(respon => {
        this.arrUsuarioId = respon
        /* console.log(this.arrUsuarioId) */
      })
      .catch(error => console.log(error))
  }
  //Aciones de botones para navegar entre pantallas
  menuNar(ruta) {
    this.router.navigate([ruta]);
  }

}
