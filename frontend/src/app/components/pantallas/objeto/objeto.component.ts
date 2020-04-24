import { Component, OnInit } from '@angular/core';
import { ObjetoService } from 'src/app/services/objeto.service';
import { ObjetoModel } from 'src/app/models/objeto.model';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss']
})
export class ObjetoComponent implements OnInit {


  arrObjeto: ObjetoModel[];

  constructor(private objetoService: ObjetoService) {
    this.arrObjeto = [];
  }

  async ngOnInit(): Promise<any> {

    this.arrObjeto = await this.objetoService.ObjetoCompleto();

  }



}
