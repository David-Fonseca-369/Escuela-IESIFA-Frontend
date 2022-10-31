import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { grupoCrearDTO, grupoDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
})
export class CrearGrupoComponent implements OnInit {
  errores: string[] = [];

  constructor(private gruposService: GruposService, private router: Router) {}

  ngOnInit(): void {}

  guardarGrupo(event: any) {
    let grupo: grupoCrearDTO = {
      idGrado: event.idGrado,
      nombre: event.nombre,
    };

    this.gruposService.crear(grupo).subscribe({
      next: () => {
        alert('Creado!');
        this.router.navigate(['/grupos']);
      },
      error: (error) => {
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
