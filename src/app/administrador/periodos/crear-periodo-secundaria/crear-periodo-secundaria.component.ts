import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { NotifyService } from 'src/app/services/notify.service';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-crear-periodo-secundaria',
  templateUrl: './crear-periodo-secundaria.component.html',
  styleUrls: ['./crear-periodo-secundaria.component.css'],
})
export class CrearPeriodoSecundariaComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];

  constructor(
    private periodosService: PeriodosService,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  guardarCambios(event: any) {
    this.isLoading = true;

    this.periodosService.crearPeriodoSecundaria(event).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Periodo creado!');
        this.router.navigate(['/periodos/secundaria']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
