import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import {MenuComponent}from "./menu/menu.component";
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CrearMateriaComponent,
    CrearGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
