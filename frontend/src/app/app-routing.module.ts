import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// pantallas --------------------------------------------
//panatalla de incio
import { InicioComponent } from './components/pantallas/inicio/inicio.component';

//pantalla de error
import { Error404Component } from './components/pantallas/error404/error404.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  //Pagina error -----------------------------
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
