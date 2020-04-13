import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-avatar',
  templateUrl: './usuario-avatar.component.html',
  styleUrls: ['./usuario-avatar.component.scss']
})
export class UsuarioAvatarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
