import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-conversacion',
  templateUrl: './usuario-conversacion.component.html',
  styleUrls: ['./usuario-conversacion.component.scss']
})
export class UsuarioConversacionComponent implements OnInit {

  @Input() usuario: any = {};
  @Input() id: number;
  conversacionR: any = {};
  usuarioA: any = {}
  constructor() { }

  ngOnInit(): void {
    this.usuarioA = this.usuario[this.id];
    this.conversacionR = this.usuarioA.conversacionesEnviada;
  }

}
