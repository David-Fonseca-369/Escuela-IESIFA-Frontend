import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './administrador/grupos/editar-grupo/editar-grupo.component';
import { ListaGruposComponent } from './administrador/grupos/lista-grupos/lista-grupos.component';
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './administrador/materias/editar-materia/editar-materia.component';
import { ListaMateriasComponent } from './administrador/materias/lista-materias/lista-materias.component';

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
  {
    path: '',
    component: CrearMateriaComponent,
  },
  // home page
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
