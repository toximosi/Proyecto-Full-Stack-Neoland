// ! Este componente es el centro de conexion de todos los componentes, aquí importaremos la mayoria de los elementos.
//-------------------------------------------------------------------------------------------------------------------
//Propios de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

//Externos
//Para el mapa:
import { AgmCoreModule, GoogleMapsAPIWrapper, InfoWindowManager } from '@agm/core';
import { AgmOverlays } from "agm-overlays"
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
// importacion Font-iconos de font awesome: https://fontawesome.com/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//alertas
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//-------------------------------------------------------------------------------------------------------------------
//Componentes
//-------------------------------------------------------------------------------------------------------------------
//Menus -------------------------------------------------------------------------------------------------------------
import { MenuTopComponent } from './components/menus/menu-top/menu-top.component';
import { MenuFooterComponent } from './components/menus/menu-footer/menu-footer.component';
import { MenuPrincipalComponent } from './components/menus/menu-principal/menu-principal.component';
import { MenuUsuarioComponent } from './components/menus/menu-usuario/menu-usuario.component';
import { MenuUsuarioPerfilComponent } from './components/menus/menu-usuario-perfil/menu-usuario-perfil.component';

//Pantallas ---------------------------------------------------------------------------------------------------------
import { InicioComponent } from './components/pantallas/inicio/inicio.component';
import { AgujerosMapaComponent } from './components/pantallas/mapas/agujeros-mapa/agujeros-mapa.component';
import { ObjetoMapaComponent } from './components/pantallas/mapas/objeto-mapa/objeto-mapa.component';
import { UsuarioPerfilComponent } from './components/pantallas/usuario-perfil/usuario-perfil.component';
import { AlarmasComponent } from './components/pantallas/alarmas/alarmas.component';
import { Error404Component } from './components/pantallas/error404/error404.component';
import { UsuarioComponent } from './components/pantallas/usuario/usuario.component';
import { UsuarioConversacionComponent } from './components/pantallas/usuario-conversacion/usuario-conversacion.component';
import { UsuarioObjetoComponent } from './components/pantallas/usuario-objeto/usuario-objeto.component';
import { UsuarioAvatarComponent } from './components/pantallas/usuario-avatar/usuario-avatar.component';
import { LoginComponent } from './components/pantallas/login/login.component';

//Servicios ---------------------------------------------------------------------------------------------------------
import { LoginService } from './services/login.service';
import { UsuarioService } from './services/usuario.service';
import { ObjetoService } from './services/objeto.service';
import { ConversacionService } from './services/conversacion.service';
import { ObjetoComponent } from './components/pantallas/objeto/objeto.component';

//Pipes ---------------------------------------------------------------------------------------------------------
import { NoimagePipe } from './pipes/noimage.pipe';
import { UrlimgPipe } from './pipes/urlimg.pipe';
import { RegistroComponent } from './components/pantallas/registro/registro.component';
import { UsuarioObjetoCrearComponent } from './components/pantallas/usuario-objeto-crear/usuario-objeto-crear.component';
import { PruebasComponent } from './pruebas/pruebas/pruebas.component';



/* import { secret } from './../../secret/secret.js'; */

@NgModule({
  declarations: [
    AppComponent,
    //menus ---------------
    MenuTopComponent,
    MenuFooterComponent,
    MenuPrincipalComponent,
    MenuUsuarioComponent,
    MenuUsuarioPerfilComponent,
    //pantallas ---------------
    InicioComponent,
    UsuarioPerfilComponent,
    AgujerosMapaComponent,
    ObjetoMapaComponent,
    Error404Component,
    AlarmasComponent,
    UsuarioComponent,
    UsuarioConversacionComponent,
    UsuarioObjetoComponent,
    UsuarioAvatarComponent,
    LoginComponent,
    ObjetoComponent,
    //pipes ---------------
    NoimagePipe,
    UrlimgPipe,
    RegistroComponent,
    UsuarioObjetoCrearComponent,
    PruebasComponent

  ],
  imports: [
    //Propios de angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    //formularios
    FormsModule,
    /* FormControl, */
    ReactiveFormsModule,
    //Externos
    /*GoogleMapsModule AGM */
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWZrpJI2-LQx7EzfmcCx1RXF0abidsIm8',
      //Mario
      /* apiKey: 'AIzaSyB9CobDD06h6vgzmUpmoKIpCgSXc43B7B0', */
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    // Font iconos de font awesome: https://fontawesome.com/
    FontAwesomeModule,
    NgbModule,
    //alertas
    SweetAlert2Module.forRoot()
  ],
  providers: [
    //aunque los sercivios tienen el "providedIn: 'root'", lo incluimos por si acaso
    LoginService,
    UsuarioService,
    ObjetoService,
    ConversacionService,
    /*GoogleMapsModule AGM */
    GoogleMapsAPIWrapper,
    /* InfoWindowManager */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
