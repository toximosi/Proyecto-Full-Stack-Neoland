import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss']
})
export class MenuFooterComponent implements OnInit {
  //Variable
  fecha: Date;
  ano: number;

  constructor(private router: Router) {
    this.fecha = new Date();

  }

  ngOnInit(): void {
    this.ano = this.fecha.getFullYear();

  }


}
