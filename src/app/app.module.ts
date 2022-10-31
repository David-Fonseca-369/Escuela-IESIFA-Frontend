import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import {MenuComponent}from "./menu/menu.component";
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { ListaGruposComponent } from "./administrador/grupos/lista-grupos/lista-grupos.component";


//Formularios Reactivos
//Binding de doble via
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

//Para consumir APIs
import { HttpClientModule } from "@angular/common/http";
import { FormularioGrupoComponent } from './administrador/grupos/formulario-grupo/formulario-grupo.component';
import { MostrarErroresComponent } from './helpers/mostrar-errores/mostrar-errores.component';
import { EditarGrupoComponent } from './administrador/grupos/editar-grupo/editar-grupo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CrearMateriaComponent,
    CrearGrupoComponent,
    ListaGruposComponent,
    FormularioGrupoComponent,
    MostrarErroresComponent,
    EditarGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
