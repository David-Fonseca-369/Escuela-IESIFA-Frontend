import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  providers: [
    //Para que siempre se mantenga flotante el label y la apariencia sea outline
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class MaterialModule {}
