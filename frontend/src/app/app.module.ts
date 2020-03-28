// ! Este componente es el centro de conexion de todos los componentes, aquí importaremos la mayoria de los elementos.
//-------------------------------------------------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importacion Font-iconos de font awesome: https://fontawesome.com/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuTopComponent } from './components/menus/menu-top/menu-top.component';
import { MenuFooterComponent } from './components/menus/menu-footer/menu-footer.component';
import { MenuPrincipalComponent } from './components/menus/menu-principal/menu-principal.component';
import { InicioComponent } from './components/pantallas/inicio/inicio.component';
import { UsuarioPerfilComponent } from './components/pantallas/usuario-perfil/usuario-perfil.component';
import { MapaComponent } from './components/pantallas/mapa/mapa.component';
import { Error404Component } from './components/pantallas/error404/error404.component';
import { AlarmasComponent } from './components/pantallas/alarmas/alarmas.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    MenuFooterComponent,
    MenuPrincipalComponent,
    InicioComponent,
    UsuarioPerfilComponent,
    MapaComponent,
    Error404Component,
    AlarmasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Font iconos de font awesome: https://fontawesome.com/
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
