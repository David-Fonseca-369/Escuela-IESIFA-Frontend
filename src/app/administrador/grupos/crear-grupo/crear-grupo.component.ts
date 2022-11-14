import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { GrupoCrearDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
})
export class CrearGrupoComponent implements OnInit {
  errores: string[] = [];
isLoading = false;

  constructor(
    private gruposService: GruposService,
    private router: Router,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {}

  guardarGrupo(event: any) {
    this.isLoading = true;
    let grupo: GrupoCrearDTO = {
      idGrado: event.idGrado,
      nombre: event.nombre,
    };

    this.gruposService.crear(grupo).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification("¡Creado!")
        this.router.navigate(['/grupos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
