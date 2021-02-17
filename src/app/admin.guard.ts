import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  this.authService.stateUser().pipe(
        map(user => user != null),
        tap(stateUser => {
          if (stateUser === false) {
            this.router.navigate(['/auth/sign_in']);
            if (document.readyState === 'complete') {
              alert('Inicia sesión para acceder a esta ruta');
            }
          }
        })
      );
    }
}
