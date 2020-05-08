import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {
  //variables:
  arrUsuario: UsuarioModel[];
  arrUsuarioId: UsuarioModel[];
  id: number;
  //fromulario
  formularioUsuario: FormGroup;
  formValue: any[];

  constructor(
    private usuarioService: UsuarioService,
    private activeRouter: ActivatedRoute) {
    //incialización de variables
    this.id = parseInt(localStorage.userId);
    this.arrUsuario = [];
    this.arrUsuarioId = [];
    //detectar el ID del usuario mediante el params de lal URL
    /*     this.activeRouter.params.subscribe((params) => {
          this.id = parseInt(params.usuarioID)
          console.log(params.usuarioID)
        }); */
    //inicializamos valores del formualrio
    this.formularioUsuario = new FormGroup({
      //valores por defecto de cada FornControl creado, entre parentsis. el primer valor es el de por defecto.
      alias: new FormControl(''),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      /*  passwordNew: new FormControl('') */
    });
  };

  async ngOnInit() {
    this.arrUsuario = await this.usuarioService.UsuarioCompleto();
    this.arrUsuarioId = await this.usuarioService.UsuarioCompletoId(this.id);
  };

  onSubmit() {
    //creamos oonstantes, para reducir la escritura
    const form = this.formularioUsuario.value;
    const user = this.arrUsuarioId[0];
    //Por si acaso no ha rellenado todos los input, que estos mantengan la información y no se borren
    (form.alias == "" || form.alias == "null") ? form.alias = user.alias : form.alias = form.alias;
    (form.nombre == "" || form.nombre == "null") ? form.nombre = user.nombre : form.nombre = form.nombre;
    (form.apellidos == "" || form.apellidos == "null") ? form.apellidos = user.apellidos : form.apellidos = form.apellidos;
    (form.email == "" || form.email == "null") ? form.email = user.email : form.email = form.email;
    //al mandar faltan datos que se piden el la bd, los incluimos de nuevo, repitiendo los valores que tiene por defecto el usuario Actual.
    form.ID = user.ID;
    form.edad = user.edad;
    form.foto = user.foto;

    console.log(this.formularioUsuario.value);
    this.usuarioService.UsuarioCambiar(this.formularioUsuario.value);
  };

}
