import { HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Sentry from '@sentry/angular';

if (environment.production === true) {
  Sentry.init({
    dsn: 'https://83cfd4a5b6774939b45ff6117416007b@o506527.ingest.sentry.io/5596328',
    autoSessionTracking: true,
    tracesSampleRate: 1.0,
  });
}

/**
 * Manejo de errores con condiciones. Cada condición lanzará un mensaje de alerta y se enviara el evento del error a Sentry.
 * @param error Cuando la promesa es rechazada la información se guarda en error.
 * @returns Mensaje de error.
 */
export function HandleError(error: any): Observable<never> {

  let message: any;

  if (error === 'auth/user-not-found') {
    message = alert('El email no esta registrado.');
    Sentry.captureEvent(error.error);
    return throwError(message);
  }

  if (error === 'auth/email-already-in-use') {
    message = alert('El email ya esta en uso.');
    Sentry.captureEvent(error.error);
    return throwError(message);
  }

  if (error === 'auth/weak-password') {
    message =  alert('La contraseña debe tener mínimo 6 caracteres.');
    Sentry.captureEvent(error.error);
    return throwError(message);
  }

  if (error === 'auth/popup-closed-by-user') {
    message = alert('Se ha cerrado la ventana emergente antes de finalizar la operación.');
    Sentry.captureEvent(error.error);
    return throwError(message);
  }

  if (error === 'auth/wrong-password') {
    message = alert('La contraseña no es correcta.');
    Sentry.captureEvent(error.error);
    return throwError(message);
  }
}

/**
 * Manejo de errores con switch. Cada condición lanzará un mensaje de alerta y se enviara el evento del error a Sentry.
 * @param error Cuando la promesa es rechazada la información se guarda en error.
 * @returns Mensaje de error.
 */
export function HandleHttpResponseError(error: HttpErrorResponse): Observable<never> {

  let alertMessage: any;

  switch (error.status) {
    case 0:
      alertMessage = alert('Error en la ruta de la pagina, revisa tus URLs.');
      Sentry.captureEvent(error.error);
      return throwError(alertMessage);
  }
}
