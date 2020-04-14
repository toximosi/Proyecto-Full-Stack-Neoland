import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModule } from 'src/app/models/usuario.module';
import { UsuarioComponent } from '../usuario/usuario.component';


@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  @Input() usuario: any = {};
  @Input() id: number;


  constructor(private usuarioComponent: UsuarioComponent) { }

  ngOnInit(): void {

    /* this.usuario = this.usuarioComponent.usuario */


  }

}
