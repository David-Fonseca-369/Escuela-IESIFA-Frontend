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
import { MateriasDocentesComponent } from './administrador/materias/materias-docentes/materias-docentes.component';
import { ListaPeriodosSecundariaComponent } from './administrador/periodos/lista-periodos-secundaria/lista-periodos-secundaria.component';
import { ListaPeriodosPreparatoriaComponent } from './administrador/periodos/lista-periodos-preparatoria/lista-periodos-preparatoria.component';
import { FormularioPeriodoComponent } from './administrador/periodos/formulario-periodo/formulario-periodo.component';
import { CrearPeriodoSecundariaComponent } from './administrador/periodos/crear-periodo-secundaria/crear-periodo-secundaria.component';
import { CrearPeriodoPreparatoriaComponent } from './administrador/periodos/crear-periodo-preparatoria/crear-periodo-preparatoria.component';
import { MateriasAsignadasComponent } from './docente/materias-asignadas/materias-asignadas.component';
import { CalificacionesCrearComponent } from './docente/calificaciones-crear/calificaciones-crear.component';
import { ListaAlumnosCalificacionesComponent } from './docente/lista-alumnos-calificaciones/lista-alumnos-calificaciones.component';
import { ReporteDocenteComponent } from './docente/reporte-docente/reporte-docente.component';
import { ReporteDocentePreparatoriaComponent } from './docente/reporte-docente-preparatoria/reporte-docente-preparatoria.component';
import { AlumnosMateriaComponent } from './docente/alumnos-materia/alumnos-materia.component';

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
    MateriasDocentesComponent,
    ListaPeriodosSecundariaComponent,
    ListaPeriodosPreparatoriaComponent,
    FormularioPeriodoComponent,
    CrearPeriodoSecundariaComponent,
    CrearPeriodoPreparatoriaComponent,
    MateriasAsignadasComponent,
    CalificacionesCrearComponent,
    ListaAlumnosCalificacionesComponent,
    ReporteDocenteComponent,
    ReporteDocentePreparatoriaComponent,
    AlumnosMateriaComponent,
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
