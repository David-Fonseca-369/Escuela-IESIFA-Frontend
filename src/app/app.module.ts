import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { ListaGruposComponent } from './administrador/grupos/lista-grupos/lista-grupos.component';

//mensajes sweet alert
////v11.0.0
//npm i @sweetalert2/ngx-sweetalert2@11.0.0 --force

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Formularios Reactivos
//Binding de doble via
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Para consumir APIs
import { HttpClientModule } from '@angular/common/http';

//componentes
import { FormularioGrupoComponent } from './administrador/grupos/formulario-grupo/formulario-grupo.component';
import { MostrarErroresComponent } from './helpers/mostrar-errores/mostrar-errores.component';
import { EditarGrupoComponent } from './administrador/grupos/editar-grupo/editar-grupo.component';
import { SpinnerComponent } from './helpers/spinner/spinner.component';
import { NotifyComponent } from './snackBars/notify/notify.component';
import { ListaMateriasComponent } from './administrador/materias/lista-materias/lista-materias.component';
import { FormularioMateriaComponent } from './administrador/materias/formulario-materia/formulario-materia.component';
import { EditarMateriaComponent } from './administrador/materias/editar-materia/editar-materia.component';
import { ListaUsuariosComponent } from './administrador/usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './administrador/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './administrador/usuarios/editar-usuario/editar-usuario.component';
import { ListaAlumnosComponent } from './administrador/alumnos/lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './administrador/alumnos/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './administrador/alumnos/editar-alumno/editar-alumno.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CrearMateriaComponent,
    CrearGrupoComponent,
    ListaGruposComponent,
    FormularioGrupoComponent,
    MostrarErroresComponent,
    EditarGrupoComponent,
    SpinnerComponent,
    NotifyComponent,
    ListaMateriasComponent,
    FormularioMateriaComponent,
    EditarMateriaComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ListaAlumnosComponent,
    CrearAlumnoComponent,
    EditarAlumnoComponent,
    LoginComponent,
    AuthorizedComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
