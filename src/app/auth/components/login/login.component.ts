import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HandleError } from 'src/app/utils/errors/errors';

import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.signInForm();
  }

  ngOnInit(): void {
  }

  /**
   * Es el formulario reactivo para iniciar sesión con correo electrónico y contraseña.
   * @returns el método no retornara valores, puesto que es de tipo void y no tiene parámetros.
   */
  public signInForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Comprobar si el formulario de iniciar sesión es valido y si es asi llama al método signInEmailPass de authService
   * pasando los parámetros de correo electrónico y contraseña que el usuario proporcionó. Esta método se ejecutara cuando en el formulario
   * de iniciar sesión ocurra un evento de envío.
   * Si no hubo ningún error se navegara a /search de lo contrario saldrá un error.
   */
  signInEmailPass(): void {
    if (this.form.valid) {
      this.authService.signInEmailPass(this.form.value.email, this.form.value.password)
          .then(() => {
            this.router.navigate(['/search']);
          })
          .catch(error => {
            HandleError(error.code);
          });
    }
  }

  /**
   * Invocar al método signInGitHub de authService la cual iniciara sesión con GitHub
   *@returns el método no retornara valores, puesto que es de tipo void y no tiene parámetros.
   */
  signInGitHub(): void {
      this.authService.signInGitHub();
  }

}
