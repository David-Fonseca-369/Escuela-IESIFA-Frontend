import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { materiaEditarDTO } from '../materia';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css'],
})
export class EditarMateriaComponent implements OnInit {
  errores: string[] = [];
  isLoading = false;
  materia: materiaEditarDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notify: NotifyService,
    private materiasService: MateriasService
  ) {}

  ngOnInit(): void {
    this.obtenerMateria();
  }

  obtenerMateria() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.materiasService.obtenerPorId(params['id']).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.materia = response;
        },
        error: () => {
          this.isLoading = false;
         this.router.navigate(['/materias'])
        },
      });
    });
  }

  guardarCambios(event: any) {
    this.isLoading = true;

    this.materiasService.editar(event, this.materia.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification("¡Modificado!");
        this.router.navigate(['/materias']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
