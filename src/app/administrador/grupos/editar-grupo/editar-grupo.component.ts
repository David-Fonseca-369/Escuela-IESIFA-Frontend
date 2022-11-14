import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { GrupoCrearDTO, GrupoEditarDTO } from '../grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css'],
})
export class EditarGrupoComponent implements OnInit {
  errores: string[] = [];
  grupo: GrupoEditarDTO;
  isLoading = false;

  constructor(
    private gruposService: GruposService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notify : NotifyService
  ) {}

  ngOnInit(): void {
    this.obtenerGrupo();
  }

  obtenerGrupo() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.gruposService.obtenerPorId(params['id']).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.grupo = response;
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/grupos']);
        },
      });
    });
  }

  guardarCambios(event: any) {
    
    this.isLoading = true;

    let grupo: GrupoCrearDTO = {
      idGrado: event.idGrado,
      nombre: event.nombre,
    };

    this.gruposService.editar(grupo, this.grupo.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification("¡Modificado!")
        this.router.navigate(['/grupos']);
        
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
