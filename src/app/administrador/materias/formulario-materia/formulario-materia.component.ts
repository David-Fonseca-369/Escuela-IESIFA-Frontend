import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { GrupoSelectorDTO } from '../../grupos/grupo';
import { GruposService } from '../../grupos/grupos.service';
import { MateriaCrearDTO, MateriaEditarDTO } from '../materia';

@Component({
  selector: 'app-formulario-materia',
  templateUrl: './formulario-materia.component.html',
  styleUrls: ['./formulario-materia.component.css'],
})
export class FormularioMateriaComponent implements OnInit {
  grupos: GrupoSelectorDTO[];

  isLoading = false;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<MateriaCrearDTO> = new EventEmitter<MateriaCrearDTO>();

  @Input()
  materia: MateriaEditarDTO;

  form: FormGroup;

  constructor(
    private gruposService: GruposService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obtenerGrupos();

    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idGrupo: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      descripcion: ['', { validators: [Validators.maxLength(255)] }],
    });

    //si es para editar
    if (this.materia !== undefined) {
      this.form.patchValue(this.materia);
    }
  }

  obtenerGrupos() {
    this.isLoading = true;
    this.gruposService.gruposSelector().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.grupos = response;
      },
      error: (error) => {
        this.errores = parsearErroresAPI(error);
      },
    });
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
}
