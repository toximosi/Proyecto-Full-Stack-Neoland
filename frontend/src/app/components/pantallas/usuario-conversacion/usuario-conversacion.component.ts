import { Component, OnInit, Input } from '@angular/core';
import { ConversacionService } from 'src/app/services/conversacion.service';
import { ConversacionModel } from 'src/app/models/conversacion.model';

@Component({
  selector: 'app-usuario-conversacion',
  templateUrl: './usuario-conversacion.component.html',
  styleUrls: ['./usuario-conversacion.component.scss']
})
export class UsuarioConversacionComponent implements OnInit {

  id: number = 0;
  conversacion: ConversacionModel[];
  mensajes: any[];

  constructor(private conversacionService: ConversacionService) { }

  ngOnInit(): void {

    this.conversacionService.Conversacion()
      .then(
        (pConversacion) => {
          this.conversacion = pConversacion;
          this.mensajes = pConversacion[this.id].mensajes;
        }
      )
      .catch(error => console.log("Error ConversacionId: " + error));

  }

}
