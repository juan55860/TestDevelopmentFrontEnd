import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HandleError } from 'src/app/utils/errors/errors';

import { AuthService } from 'src/app/core/service/auth/auth.service';

import { faUserSecret } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userSecret = faUserSecret;

  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.signUpForm();
  }

  ngOnInit(): void {
  }

  /**
   * Creación del formulario reactivo para registrar usuarios con correo electrónico y contraseña, ademas
   * cuenta con confirmación de contraseña
   * @returns el método no retornara valores, puesto que es de tipo void y no tiene parámetros.
   */
  signUpForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, {validators: this.passwordConfirming});
  }

  /**
   * Método para confirmar la contraseña, donde se evaluara la contraseña del usuario del campo password contra
   * la confirmación de la contraseña del usuario que proporcionó en el campo confirmpassword.
   * @param c Es de tipo AbstractControl, el cual en este caso proporcionara la validación y valores del formulario de registro.
   * @returns true cuando la contraseña sea diferente a la confirmación de ella misma y false cuando la contraseña sea la misma
   * que su confirmación.
   */
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmpassword').value) {
      return {invalid: true};
    }
  }

  /**
   * Comprobar si el formulario de registro es valido y si es asi llamara al método signUpEmailPass de authService
   * pasando los parámetros de correo electrónico y contraseña que el usuario proporcionó. Esta método se ejecutara cuando en el formulario
   * de registro ocurra un evento de envío.
   * Si no hubo ningún error se navegara a /auth/sign_in de lo contrario saldrá un error.
   * @param event Es de tipo Event el cual contendrá información del evento que ocurra para cancelar el evento si se puede cancelar
   * sin detener el resto del funcionamiento del evento.
   */
  signUpEmailPass(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.authService.signUpEmailPass(this.form.value.email, this.form.value.password)
          .then(() => {
            this.router.navigate(['/auth/sign_in']);
          })
          .catch(error => {
            HandleError(error.code);
          });
    }
  }

}
