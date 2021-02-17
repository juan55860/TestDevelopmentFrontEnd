import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { HandleHttpResponseError } from 'src/app/utils/errors/errors';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Método para hacer una petición get a la RESET API de GitHub y obtener la información de los usuarios de GitHub dependiendo
   * del login que se le pase.
   * @param login De tipo string que hace referencia al username que se utiliza para iniciar sesión en GitHub.
   * @returns Un Observable de tipo Object en el cual estará la información de los usuarios dependiendo del parámetro que se le pasó.
   */
  getUsers(login: string): Observable<Object> {
    return this.http.get(`${environment.url_api_get_users}${login}`)
        .pipe(
            catchError(HandleHttpResponseError)
        );
  }

  /**
   * Método para hacer una petición get a la RESET API de GitHub y obtener la información de solo un usuario de GitHub dependiendo
   * del login que se le pase.
   * @param login De tipo string que hace referencia al username que se utiliza para iniciar sesión en GitHub.
   * @returns Un Observable de tipo Object en el cual estará la información del usuario.
   */
  getUser(login: string): Observable<Object> {
    return this.http.get(`${environment.url_api_get_user}${login}`)
        .pipe(
            catchError(HandleHttpResponseError)
        );
  }

}
