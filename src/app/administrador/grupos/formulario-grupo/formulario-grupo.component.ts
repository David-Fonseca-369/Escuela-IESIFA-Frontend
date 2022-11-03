import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { group } from 'console';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { GradosService } from 'src/app/services/grados.service';
import { gradoSelectorDTO } from 'src/app/services/models/grados/grado';
import { nivelEducativoDTO } from 'src/app/services/models/niveles-educativos/nivelEducativo';
import { NivelEducativoService } from 'src/app/services/nivel-educativo.service';
import { grupoCrearDTO, grupoDTO, grupoEditarDTO } from '../grupo';

@Component({
  selector: 'app-formulario-grupo',
  templateUrl: './formulario-grupo.component.html',
  styleUrls: ['./formulario-grupo.component.css'],
})
export class FormularioGrupoComponent implements OnInit {
  form: FormGroup;

  @Input()
  grupo: grupoEditarDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<grupoCrearDTO> = new EventEmitter<grupoCrearDTO>();

  nivelesEducativos: nivelEducativoDTO[];

  grados: gradoSelectorDTO[];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private nivelesEducativosService: NivelEducativoService,
    private gradosService: GradosService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.obtenerNivelesEducativos();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idNivelEducativo: ['', { validators: [Validators.required] }],
      idGrado: ['', { validators: [Validators.required] }],
      nombre: [
        '',
        { validators: [Validators.required, Validators.maxLength(60)] },
      ],
    });    

    //si es para editar
    if (this.grupo !== undefined) {
      this.form.patchValue(this.grupo);
      //obtenega  y machee con el combo del registro seleccionado
      this.obtenerGradosEditar(this.grupo.idNivelEducativo);
    }
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

  guardar() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerNivelesEducativos() {
    this.isLoading = true;

    this.nivelesEducativosService.todos().subscribe({
      next: (response) => {
        this.isLoading = false;

        this.nivelesEducativos = response;

        console.log(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  obtenerGrados(event: any) {
    this.isLoading = true;

    this.gradosService.gradosSelector(event.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.grados = response;
      },

      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  obtenerGradosEditar(idNivelEducativo: number) {

    this.isLoading = true;

    this.gradosService.gradosSelector(idNivelEducativo).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.grados = response;
      },

      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
