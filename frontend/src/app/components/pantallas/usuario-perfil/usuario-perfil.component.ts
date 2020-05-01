import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbPaginationNumber, NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  //variables:
  arrUsuario: UsuarioModel[];
  id: number;
  //fromulario
  formulario: FormGroup;
  formValue: any[];

  constructor(
    private usuarioService: UsuarioService) {
    //incialización de variables
    this.id = 0;
    this.arrUsuario = [];

  };

  async ngOnInit() {
    this.arrUsuario = await this.usuarioService.UsuarioCompleto();
    this.formulario = new FormGroup({
      //valores por defecto de cada FornControl creado, entre parentsis. el primer valor es el de por defecto.
      alias: new FormControl(this.arrUsuario[0].alias),
      nombre: new FormControl(this.arrUsuario[0].nombre),
      apellido: new FormControl(this.arrUsuario[0].apellidos),
      email: new FormControl(this.arrUsuario[0].email),
      password: new FormControl('', [Validators.required]),
      passwordNew: new FormControl('')
    });
    console.log(this.arrUsuario)
  };

  onSubmit() {

    console.log(this.formulario.value);
  };

  private CambioDatoUsuario(pAlias, pNombre, pApellido, pEmail, pPassword, pPasswordNew) {

    this.usuarioService.UsuarioCambiar(this.formValue);
  }



}
