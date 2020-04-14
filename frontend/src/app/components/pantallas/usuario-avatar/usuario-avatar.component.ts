import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModule } from 'src/app/models/usuario.module';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuario-avatar',
  templateUrl: './usuario-avatar.component.html',
  styleUrls: ['./usuario-avatar.component.scss']
})
export class UsuarioAvatarComponent implements OnInit {

  @Input() usuario: any = {};
  @Input() id: number;

  constructor(private usuarioComponent: UsuarioComponent) { }

  ngOnInit(): void {

    /* this.id = 0; */

    /*     this.usuario = this.usuarioComponent.UsuarioDatos(); */

  }

}
