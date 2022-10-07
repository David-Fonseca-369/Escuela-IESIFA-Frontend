import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearGrupoComponent } from './administrador/grupos/crear-grupo/crear-grupo.component';
import { CrearMateriaComponent } from './administrador/materias/crear-materia/crear-materia.component';

const routes: Routes = [
  {
    path: 'grupos/crear',
    component: CrearGrupoComponent
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
