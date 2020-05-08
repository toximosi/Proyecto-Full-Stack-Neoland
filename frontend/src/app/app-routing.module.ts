import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// pantallas --------------------------------------------
//panatalla de incio
import { InicioComponent } from './components/pantallas/inicio/inicio.component';
import { AgujerosMapaComponent } from './components/pantallas/mapas/agujeros-mapa/agujeros-mapa.component';
import { ObjetoMapaComponent } from './components/pantallas/mapas/objeto-mapa/objeto-mapa.component';
import { Error404Component } from './components/pantallas/error404/error404.component';
import { ObjetoComponent } from './components/pantallas/objeto/objeto.component';
import { AlarmasComponent } from './components/pantallas/alarmas/alarmas.component';
//usuario---------------------------------
import { LoginComponent } from './components/pantallas/login/login.component';
import { RegistroComponent } from './components/pantallas/registro/registro.component';
import { UsuarioPerfilComponent } from './components/pantallas/usuario-perfil/usuario-perfil.component';
import { UsuarioComponent } from './components/pantallas/usuario/usuario.component';
import { UsuarioConversacionComponent } from './components/pantallas/usuario-conversacion/usuario-conversacion.component';
import { UsuarioObjetoComponent } from './components/pantallas/usuario-objeto/usuario-objeto.component';
import { UsuarioObjetoCrearComponent } from './components/pantallas/usuario-objeto-crear/usuario-objeto-crear.component';
import { UsuarioAvatarComponent } from './components/pantallas/usuario-avatar/usuario-avatar.component';
//--GUARD ------------------------------------------------
/* import { LoginGuard } from './guard/login.guard'; */
import { PruebasComponent } from './pruebas/pruebas/pruebas.component';
import { LoginGuard } from './guard/login.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', component: InicioComponent },
  { path: 'centro', component: ObjetoMapaComponent },
  { path: 'mapa', component: AgujerosMapaComponent },
  { path: 'objeto', component: ObjetoComponent },
  { path: 'login', component: LoginComponent },//!borrar
  { path: 'registro', component: RegistroComponent },//!borrar
  {
    /* path: 'usuario', component: UsuarioComponent, */
    /* path: 'usuario/:usuarioID', component: UsuarioComponent, */
    path: 'usuario', component: UsuarioComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: UsuarioPerfilComponent },
      { path: 'perfil', component: UsuarioPerfilComponent },
      { path: 'conversacion', component: UsuarioConversacionComponent },
      { path: 'objeto', component: UsuarioObjetoComponent },
      { path: 'objeto-crear', component: UsuarioObjetoCrearComponent },
    ]
  },
  /*   { path: 'alarma', pathMatch: 'full', component: AlarmasComponent }, */

  /*  { path: 'informacion', pathMatch: 'full', component: ----- },
  { path: 'politica-cookies', pathMatch: 'full', component: ----- }*/
  //Pagina error -----------------------------
  /*  { path: 'pruebas', pathMatch: 'full', component: PruebasComponent }, */
  { path: '404', pathMatch: 'full', component: Error404Component },
  { path: '**', redirectTo: '404' },
  //☠️ Aquí debajo //!nada de rutas, cualquier ruta nueva encima de //Pagina error!!!!!!!!!!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    /* RouterModule.forRoot(routes, { useHash: true }) */
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
