import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { grupoDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})
export class ListaGruposComponent implements OnInit {

  grupos : grupoDTO[];
  errores : string[] = [];
  columnasAMostrar = ['nombre', 'nombreGrado', 'nombreNivelEducativo', 'estado', 'opciones'];
  constructor(private gruposService : GruposService) { }

  ngOnInit(): void {
    this.obtenerGrupos();
  }


  obtenerGrupos(){
    this.gruposService.todos()
    .subscribe({
      next: (response)=> {
        this.grupos = response;
      },
      error:(error)=> {
 this.errores = parsearErroresAPI(error)
      }

    })
  }

}
