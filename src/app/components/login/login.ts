import { Component } from '@angular/core';
import { UserDTO } from '../../models/userDTO';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
loginForm!:FormGroup;

  constructor (private userService:UserService,  private formBuilder: FormBuilder,private _snackBar: MatSnackBar,
              private router:Router
  ){}

  ngOnInit() {
    this.CargarFormulario();
  }

CargarFormulario() {
    this.loginForm = this.formBuilder.group({
      // 4. Agregamos Validators.required a los campos
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Ingresar() {
    // 5. Validamos antes de enviar
    if (this.loginForm.invalid) {
      // 1. Validamos si el formulario es inválido
    if (this.loginForm.invalid) {
      
      // TRUCO: Marcamos todos los campos como "tocados" para que los mat-error se pinten de rojo
      this.loginForm.markAllAsTouched(); 
      
      // 2. Mostramos el SnackBar
      this._snackBar.open('Por favor, complete todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
        panelClass: ['warn-snackbar'], // Asegura que tenga estilo si usas clases personalizadas
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return; // Detenemos la ejecución
    }
    }

    const userDTO: UserDTO = {
      id: 0,
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      authorities: '',
    };

    this.userService.login(userDTO).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // 6. Bonus: Mostrar mensaje si las credenciales son incorrectas (backend rechaza)
        this._snackBar.open('Usuario o contraseña incorrectos', 'Error', {
          duration: 3000,
        });
      }
    });
  }
}
