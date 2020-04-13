import { Component, OnInit } from '@angular/core';
import { ObjetoModule } from 'src/app/models/objeto/objeto.module';
import { ObjetoService } from 'src/app/services/objeto.service';


@Component({
  selector: 'app-usuario-objeto',
  templateUrl: './usuario-objeto.component.html',
  styleUrls: ['./usuario-objeto.component.scss']
})
export class UsuarioObjetoComponent implements OnInit {

  objeto: ObjetoModule[];

  constructor(private objetoService: ObjetoService) { }

  ngOnInit(): void {

    /* this.objetoService.ObjetoVer()
      .then(response => { console.log(response) })
      .catch(error => console.log("Error UsuarioVer: " + error)) ;*/

    this.objetoService.ObjetoVer()
      .then(
        pObjeto => {
          this.objeto = pObjeto;
          //console.log(this.objeto);
        })
      .catch(error => console.log("Error UsuarioVer: " + error))

  }


}
