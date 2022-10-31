import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './administrador/grupos/editar-grupo/editar-grupo.component';
import { ListaGruposComponent } from './administrador/grupos/lista-grupos/lista-grupos.component';
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';

const routes: Routes = [
  {
    path: 'grupos',
    component: ListaGruposComponent
  },
  {
    path: 'grupos/crear',
    component: CrearGrupoComponent
  },
  {
    path: 'grupos/editar/:id',
    component: EditarGrupoComponent
  },
  {
    path: '',
    component: CrearMateriaComponent
  },
  // home page
  {
    path: '*', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
