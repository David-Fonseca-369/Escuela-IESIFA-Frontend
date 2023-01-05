import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlumnoComponent } from './administrador/alumnos/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './administrador/alumnos/editar-alumno/editar-alumno.component';
import { ListaAlumnosComponent } from './administrador/alumnos/lista-alumnos/lista-alumnos.component';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './administrador/grupos/editar-grupo/editar-grupo.component';
import { ListaGruposComponent } from './administrador/grupos/lista-grupos/lista-grupos.component';
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './administrador/materias/editar-materia/editar-materia.component';
import { ListaMateriasComponent } from './administrador/materias/lista-materias/lista-materias.component';
import { MateriasDocentesComponent } from './administrador/materias/materias-docentes/materias-docentes.component';
import { CrearPeriodoPreparatoriaComponent } from './administrador/periodos/crear-periodo-preparatoria/crear-periodo-preparatoria.component';
import { CrearPeriodoSecundariaComponent } from './administrador/periodos/crear-periodo-secundaria/crear-periodo-secundaria.component';
import { ListaPeriodosPreparatoriaComponent } from './administrador/periodos/lista-periodos-preparatoria/lista-periodos-preparatoria.component';
import { ListaPeriodosSecundariaComponent } from './administrador/periodos/lista-periodos-secundaria/lista-periodos-secundaria.component';
import { CrearUsuarioComponent } from './administrador/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './administrador/usuarios/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './administrador/usuarios/lista-usuarios/lista-usuarios.component';
import { CalificacionesComponent } from './alumno/calificaciones/calificaciones.component';
import { AlumnosMateriaComponent } from './docente/alumnos-materia/alumnos-materia.component';
import { CalificacionesCrearComponent } from './docente/calificaciones-crear/calificaciones-crear.component';
import { ListaAlumnosCalificacionesComponent } from './docente/lista-alumnos-calificaciones/lista-alumnos-calificaciones.component';
import { MateriasAsignadasComponent } from './docente/materias-asignadas/materias-asignadas.component';
import { ReporteDocentePreparatoriaComponent } from './docente/reporte-docente-preparatoria/reporte-docente-preparatoria.component';
import { ReporteDocenteComponent } from './docente/reporte-docente/reporte-docente.component';
import { EsAdministradorGuard } from './es-administrador.guard';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  //GRUPOS
  {
    path: 'grupos',
    component: ListaGruposComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'grupos/crear',
    component: CrearGrupoComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'grupos/editar/:id',
    component: EditarGrupoComponent,
    canActivate: [EsAdministradorGuard],
  },

  //MATERIAS
  {
    path: 'materias',
    component: ListaMateriasComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'materias/crear',
    component: CrearMateriaComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'materias/editar/:id',
    component: EditarMateriaComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'materias/materias-docentes',
    component: MateriasDocentesComponent,
    canActivate: [EsAdministradorGuard],
  },

  //USUARIOS
  {
    path: 'usuarios',
    component: ListaUsuariosComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'usuarios/crear',
    component: CrearUsuarioComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuarioComponent,
    canActivate: [EsAdministradorGuard],
  },

  //ALUMNOS
  {
    path: 'alumnos',
    component: ListaAlumnosComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'alumnos/crear',
    component: CrearAlumnoComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'alumnos/editar/:id',
    component: EditarAlumnoComponent,
    canActivate: [EsAdministradorGuard],
  },

  //Periodos
  {
    path: 'periodos/secundaria',
    component: ListaPeriodosSecundariaComponent,
    canActivate: [EsAdministradorGuard],
  },
  {
    path: 'periodos/secundaria/crear',
    component: CrearPeriodoSecundariaComponent,
    canActivate: [EsAdministradorGuard],
  },

  {
    path: 'periodos/preparatoria',
    component: ListaPeriodosPreparatoriaComponent,
    canActivate: [EsAdministradorGuard],
  },

  {
    path: 'periodos/preparatoria/crear',
    component: CrearPeriodoPreparatoriaComponent,
    canActivate: [EsAdministradorGuard],
  },

  ////////Docente/////////////
  {
    path: 'materias-asignadas',
    component: MateriasAsignadasComponent,
  },

  {
    path: 'materias-asignadas/calificaciones-crear/:id',
    component: CalificacionesCrearComponent,
  },
  {
    path: 'materias-asignadas/reporte-docente-secundaria/:id',
    component: ReporteDocenteComponent,
  },

  {
    path: 'materias-asignadas/reporte-docente-preparatoria/:id',
    component: ReporteDocentePreparatoriaComponent,
  },
  {
    path: 'materias-asignadas/alumnos-materia/:id/:materia/:grupo',
    component: AlumnosMateriaComponent,
  },

  //Alumno
  {
    path: 'alumno/calificaciones',
    component: CalificacionesComponent,
  },


  //Login

  {
    path: 'login',
    component: LoginComponent,
  },

  // home page
  {
    path: 'landingPage',
    component: LandingPageComponent,
    canActivate: [EsAdministradorGuard]
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
