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
import { CrearUsuarioComponent } from './administrador/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './administrador/usuarios/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './administrador/usuarios/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  //GRUPOS
  {
    path: 'grupos',
    component: ListaGruposComponent,
  },
  {
    path: 'grupos/crear',
    component: CrearGrupoComponent,
  },
  {
    path: 'grupos/editar/:id',
    component: EditarGrupoComponent,
  },

  //MATERIAS
  {
    path: 'materias',
    component: ListaMateriasComponent,
  },
  {
    path: 'materias/crear',
    component: CrearMateriaComponent,
  },
  {
    path: 'materias/editar/:id',
    component: EditarMateriaComponent,
  },
 

  //USUARIOS
  {
    path: 'usuarios',
    component: ListaUsuariosComponent,
  },
  {
    path: 'usuarios/crear',
    component: CrearUsuarioComponent,
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuarioComponent,
  },

  //ALUMNOS
  {
    path: 'alumnos',
    component: ListaAlumnosComponent,
  },
  {
    path: 'alumnos/crear',
    component: CrearAlumnoComponent,
  },
  {
    path: 'alumnos/editar/:id',
    component: EditarAlumnoComponent,
  },

  //Login
  
  {
    path: 'login',
    component: LoginComponent
  },


  // home page
  {
    path: 'landingPage',
    component:LandingPageComponent,
  },

  {
    path: '*',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
