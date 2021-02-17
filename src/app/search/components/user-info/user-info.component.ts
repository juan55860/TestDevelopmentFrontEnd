import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from 'src/app/core/service/users/users.service';
import { Users } from 'src/app/users.module';

import { faUserGraduate, faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user: Users;
  userGraduate = faUserGraduate;
  bookOpen = faBookOpen;

  constructor(
      private route: ActivatedRoute,
      private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.params
        .subscribe((params: Params) => {
          const login = params.login;
          this.fetchUser(login);
        });
  }

    /**
     * Llamara el método getUser de usersService pasando el parámetro login para obtener la información del usuario
     * y guardala en la propiedad user de tipo Users.
     * @param login De tipo string. Este parámetro se obtiene de los parametros de la ruta, el cual se saca del método ngOnInit.
     */
  fetchUser(login: string): void {
   this.usersService.getUser(login)
       .subscribe(
           user =>  {
               this.user = user;
       },
           error => {
               console.error(error);
           }
       );
  }

}
