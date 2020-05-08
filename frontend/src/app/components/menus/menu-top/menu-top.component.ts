import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {
  //variables
  id: number;
  visible: boolean;

  constructor(private router: Router) {
    //inicializamos variables
    this.id = parseInt(localStorage.userId);
    this.visible = false;
  }

  ngOnInit(): void {

  }
  logeado() {
    if (this.id == null || this.id == undefined || !this.id) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

}
