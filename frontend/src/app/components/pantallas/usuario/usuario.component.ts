//angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //Variables
  //usuarioActual: UsuarioModel;
  id: number;

  constructor(private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //detectar los elemntos variables de la url
    this.activateRoute.params.subscribe((params) => {
      /* console.log(params); */
      this.id = parseInt(localStorage.userId);
    });
  }

}
