import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodoCreacionDTO } from '../periodo';

@Component({
  selector: 'app-formulario-periodo',
  templateUrl: './formulario-periodo.component.html',
  styleUrls: ['./formulario-periodo.component.css'],
})
export class FormularioPeriodoComponent implements OnInit {
  isLoading = false;
  @Output()
  onSubmit: EventEmitter<PeriodoCreacionDTO> =
    new EventEmitter<PeriodoCreacionDTO>();

  @Input()
  errores: string[] = [];

  //Opciones para ver que tipo de nivel educativo es y regresar a lista de periodos de este
  // 1 = secundaria
  // 2 = preparatoria
  @Input()
  opcion: number = 0;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  guardar() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(): string {
    var campo = this.form.get('nombre');

    if (campo.hasError('required')) {
      return 'El campo Nombre es requerido.';
    }

    if (campo.hasError('maxlength')) {
      return 'La longitud máxima es de 60 caracteres.';
    }

    return '';
  }

  volver() {
    if (this.opcion === 1) {
      this.router.navigate(['/periodos/secundaria']);
    } else {
      this.router.navigate(['periodos/preparatoria']);
    }
  }
}
