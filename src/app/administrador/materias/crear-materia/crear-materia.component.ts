import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
})
export class CrearMateriaComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];

  constructor(
    private materiasService: MateriasService,
    private notify: NotifyService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  guardarCambios(event: any) {
    this.isLoading = true;

    this.materiasService.crear(event).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Creada!');
        this.router.navigate(['/materias']);
        
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
