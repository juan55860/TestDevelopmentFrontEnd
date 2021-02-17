import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import {Observable} from 'rxjs';

import { HandleError } from 'src/app/utils/errors/errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private auth: AngularFireAuth,
      private router: Router
  ) { }

    /**
     * Método para crear usuarios con correo electrónico y contraseña. Se esta utilizando AngularFireAuth
     * para la autentificación.
     * @param email De tipo string para el cual contendrá el correo electrónico.
     * @param password De tipo string el cual contendrá la contraseña.
     * @returns Una promesa.
     */
  signUpEmailPass(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

    /**
     * Método para iniciar sesión con correo electrónico y contraseña. Se esta utilizando AngularFireAuth
     * para la autentificación.
     * @param email De tipo string para el cual contendrá el correo electrónico.
     * @param password De tipo string el cual contendrá la contraseña.
     * @returns Una promesa.
     */
  signInEmailPass(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

    /**
     * Método para iniciar sesión con GitHub. Se esta creando una constante para guardar
     * el proveedor, en este caso es GitHub. Cuando se ejecute este método se abrirá una ventana emergente para iniciar sesión.
     * Si1 no hubo problemas se redireccionara a /search
     */
  signInGitHub(): void {
    const provider = new firebase.auth.GithubAuthProvider();
    this.auth.signInWithPopup(provider)
        .then( () => {
          this.router.navigate(['/search']);
        }).catch( error => {
          HandleError(error.code);
        });
  }

    /**
     * Método para cerrar sesión.
     * @returns Al ejecutarlo se llamará la función signOut de AngularFireAuth la cual retornara una promesa.
     */
  signOut(): Promise<void> {
    return this.auth.signOut()
        .catch(() => {
          alert('Ocurrió un error al cerrar sesión, por favor Vuélvelo a intentar');
        });
  }

    /**
     * Método para saber si el usuario ha iniciado sesión o no
     * @returns Un Observable
     */
  stateUser(): Observable<firebase.User> {
    return this.auth.authState;
  }

}
