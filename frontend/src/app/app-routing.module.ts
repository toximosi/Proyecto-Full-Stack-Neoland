import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// pantallas --------------------------------------------
//panatalla de incio
import { InicioComponent } from './components/pantallas/inicio/inicio.component';
import { CentroComponent } from './components/pantallas/centro/centro.component';
import { MapaComponent } from './components/pantallas/mapa/mapa.component';
import { Error404Component } from './components/pantallas/error404/error404.component';
import { ObjetoComponent } from './components/pantallas/objeto/objeto.component';
import { AlarmasComponent } from './components/pantallas/alarmas/alarmas.component';
//usuario---------------------------------
import { LoginComponent } from './components/pantallas/login/login.component';
import { UsuarioPerfilComponent } from './components/pantallas/usuario-perfil/usuario-perfil.component';
import { UsuarioComponent } from './components/pantallas/usuario/usuario.component';
import { UsuarioConversacionComponent } from './components/pantallas/usuario-conversacion/usuario-conversacion.component';
import { UsuarioObjetoComponent } from './components/pantallas/usuario-objeto/usuario-objeto.component';
//--GUARD ------------------------------------------------
import { LoginGuard } from './guard/login.guard';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', component: InicioComponent },
  { path: 'centro', component: CentroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'objeto', component: ObjetoComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuario', component: UsuarioComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: UsuarioPerfilComponent },
      { path: 'perfil', component: UsuarioPerfilComponent },
      { path: 'conversacion', component: UsuarioConversacionComponent },
      { path: 'objeto', component: UsuarioObjetoComponent },
    ]
  },
  { path: 'alarma', pathMatch: 'full', component: AlarmasComponent },
  { path: 'conversacion', component: UsuarioConversacionComponent },

  /*  { path: 'informacion', pathMatch: 'full', component: ----- },
  { path: 'politica-cookies', pathMatch: 'full', component: ----- }*/
  //Pagina error -----------------------------
  { path: '404', pathMatch: 'full', component: Error404Component },
  { path: '**', redirectTo: '404' },
  //☠️ Aquí debajo //!nada de rutas, cualquier ruta nueva encima de //Pagina error!!!!!!!!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  /* RouterModule.forRoot(routes, { useHash: true }) */],
  exports: [RouterModule]
})
export class AppRoutingModule { }
