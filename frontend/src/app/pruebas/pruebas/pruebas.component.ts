import { Component, OnInit } from '@angular/core';
import { ObjetoModel } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';



@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {
  /*  arrPrueba: UsuarioModel[]; */
  arrPrueba: ObjetoModel[];


  constructor(private service: ObjetoService) {
    this.arrPrueba = []

  }

  async ngOnInit(): Promise<any> {

    this.arrPrueba = await this.service.ObjetoVer();

    console.log('this.arrPrueba ' + this.arrPrueba)


  }

}
