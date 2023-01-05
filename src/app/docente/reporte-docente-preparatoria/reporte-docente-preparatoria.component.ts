import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { CalificacionesService } from 'src/app/services/calificaciones.service';
import { CalificacionesDocentePreparatoriaDTO, CalificacionPreparatoriaDTO } from 'src/app/services/models/calificaciones/calificacion';

import 'jspdf-autotable';
// import html2canvas from 'html2canvas';


// npm install jspdf@1.5.3 html2canvas
// npm install @types/jspdf @types/html2canvas 
//npm install jspdf jspdf-autotable
import jsPDF from 'jspdf';


@Component({
  selector: 'app-reporte-docente-preparatoria',
  templateUrl: './reporte-docente-preparatoria.component.html',
  styleUrls: ['./reporte-docente-preparatoria.component.css']
})
export class ReporteDocentePreparatoriaComponent implements OnInit {

  isLoading = false;
  errores : string[] = [];
  calificacionesDocente : CalificacionesDocentePreparatoriaDTO;

  columnasAMostrar = [
    'nombre',
    'noCuenta',
    'primeraEvaluacion',
    'segundaEvaluacion',
    'promedio1',
    'terceraEvaluacion',
    'cuartaEvaluacion',
    'promedio2',
    'promedioFinal',
  ];

  header = [
    [
      'Nombre del Alumno',
      'No. Cuenta',
      '1°',
      '2°',
      'Promedio',
      '3°',
      '4°',
      'Promedio',    
      'Final',
    ],
  ];

  contenidoPDF: any[] = [];


  constructor(
    private calificacionesService: CalificacionesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerCalificaciones();
  }

  obtenerCalificaciones() {
    this.isLoading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.calificacionesService
        .calificacionesDocentePreparatoria(params['id'])
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.calificacionesDocente = response;

          },
          error: (error) => {
            this.isLoading = false;
            this.errores = parsearErroresAPI(error);
          },
        });
    });
  }

  calcularPromedioFinal(calificacion : CalificacionPreparatoriaDTO) : string{

    let promedio1 = (calificacion.primeraEvaluacion + calificacion.segundaEvaluacion) /2;
    let promedio2 = (calificacion.terceraEvaluacion + calificacion.cuartaEvaluacion) /2;


   return ((promedio1 + promedio2)/2).toFixed(1);

  }

  generarPDF() {
    //imagen
    var img = new Image();
    img.src = './assets/images/logoPrepa.jpeg';

    this.convertirArreglo();

    var pdf = new jsPDF();

    pdf.addImage(img, 'png', 10, 10, 20, 20);

    // x y w h

    // x y

    //  pdf.setFontSize(10).text('"2022. Año del Quincentenario de la Fundación de Toluca de Lerdo, Capital dle Estado de México"', 24, 26);

    pdf
      .setFontSize(14)
      .setFont(undefined, 'bold')
      .text('Calificaciones', 89, 40);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Materia:', 12, 50);
    pdf
      .setFontSize(10)
      .setFont(undefined, 'normal')
      .text(this.calificacionesDocente.nombreMateria, 28, 50);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Grupo:', 12, 55);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(`${this.calificacionesDocente.nombreGrupo} (${this.calificacionesDocente.nombreGrado})`, 25, 55);
  

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Nivel Educativo:', 12, 60);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.calificacionesDocente.nombreNivelEducativo, 40, 60);

  

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Docente:', 12, 65);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(this.getNombre(), 28, 65);

    pdf.setFontSize(10).setFont(undefined, 'bold').text('Fecha:', 12, 70);
    pdf.setFontSize(10).setFont(undefined, 'normal').text(`${new Date().toLocaleString()}`, 25, 70);

    (pdf as any).autoTable({
      headStyles: {
        align: 'left',
        fillColor: [11, 40, 117],
        padding: { top: 200 },
      },

      startY: 80, //La altura de donde aparecerá la autable

      head: this.header,

      body: this.contenidoPDF,
      // body: [{ content: this.contenidoPDF, styles: { fontSize: 6 } }],

      theme: 'grid',
      didDrawCell: (data: any) => {
        // console.log(data.column.index);
      },

      // html :'#my-table'
    });

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow');

    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let anio = date.getFullYear();

    // Download PDF doc
    pdf.save(`Calificaciones_${dia}-${mes}-${anio}.pdf`);
  }

  convertirArreglo() {
    this.calificacionesDocente.calificaciones.forEach((element) => {
      //'Nombre del Alumno', 'Asistencias', 'Retardos', 'Faltas'
      let arrTemp: any[] = [];
  
      let promedio1 = (element.primeraEvaluacion + element.segundaEvaluacion) / 2;
      let promedio2 = (element.terceraEvaluacion + element.cuartaEvaluacion) / 2;

      let final = (promedio1 + promedio2) / 2;

      arrTemp.push(element.nombre);
      arrTemp.push(element.noCuenta);

      arrTemp.push(element.primeraEvaluacion);
      arrTemp.push(element.segundaEvaluacion);
      arrTemp.push(promedio1.toFixed(1));

      arrTemp.push(element.terceraEvaluacion);
      arrTemp.push(element.cuartaEvaluacion);
      arrTemp.push(promedio2.toFixed(1));
      arrTemp.push(final.toFixed(1));  

      this.contenidoPDF.push(arrTemp);
    });

  }

  getNombre(): string{
    let nombre = localStorage.getItem('nombre');
    let apellidoPaterno  = localStorage.getItem('apellidoPaterno');
    let apellidoMaterno = localStorage.getItem('apellidoMaterno');


    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`
  }

}
