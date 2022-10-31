import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { grupoDTO, grupoEditarDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css'],
})
export class EditarGrupoComponent implements OnInit {
  errores: string[] = [];
  grupo : grupoEditarDTO;
  constructor(
    private gruposService: GruposService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerGrupo();
  }

  obtenerGrupo() {
    this.activatedRoute.params.subscribe((params) => {
      this.gruposService.obtenerPorId(params['id']).subscribe({
        next: (response) => {
          this.grupo = response;
          console.log(response)
        },
        error: (error) => {
          this.errores = parsearErroresAPI(error);
        },
      });
    });
  }
}
