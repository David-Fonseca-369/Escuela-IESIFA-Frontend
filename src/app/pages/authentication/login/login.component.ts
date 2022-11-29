import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { obtenerErroresGenerico, parsearErroresAPI } from 'src/app/helpers/helpers';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  isLoading = false;
  errores: string[] = [];

  constructor(
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.isLoading = true;

    this.securityService.login(this.form.value).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.securityService.guardarToken(response);
        this.router.navigate(['/landingPage']);
        
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  obtenerErrorGenerico(nombreCampo : string, nombreMostrar:string, minLength?:number, maxLength?: number): string{  
    return obtenerErroresGenerico(nombreCampo,nombreMostrar, this.form, minLength, maxLength );
    }
}
