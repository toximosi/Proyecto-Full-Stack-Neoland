import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  nombre: string;
  email: string;
  password: string;
  errorMesage: string;

  constructor(
    private loginService: LoginService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.errorMesage = null;
  };

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.formulario.value)
    //this.loginService.login(this.formulario.value);
    this.loginService.login(this.formulario.value)
      .then(
        res => {
          if (res['error']) {
            this.errorMesage = res['error'];
          } else {
            this.errorMesage = null;
            localStorage.setItem('token', res['token'])
          }
        })
      .catch(err => console.log(err));
  }
}
