import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/service/auth/auth.service';
import { UsersService } from 'src/app/core/service/users/users.service';
import { Users } from 'src/app/users.module';
import { MyValidators } from 'src/app/utils/validators/validators';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { faCalculator, faIdCard, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  users: Users[] = [];
  displayedColumns = ['user.login', 'user.id'];
  userLogin: string[] = [];
  userFollowers: number[] = [];

  calculator = faCalculator;
  idCard = faIdCard;
  userAstronaut = faUserAstronaut;

  constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.searchForm();
  }

  ngOnInit(): void {
  }

  /**
   * Formulario de búsqueda con algunos validadores, en el cual el usuario buscará con login de GitHub.
   */
  searchForm(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(4), MyValidators.isTextValid]]
    });
  }

  /**
   * Este método se ejecutara cuando se lance un evento de envió en el formulario de búsqueda.
   * Guardara el valor que se le pasó en el formulario de búsqueda para pasarlo como parámetro
   * en el método getUsers de usersService.
   */
  getUsers(): void {
    const login = this.form.value.login;
    this.usersService.getUsers(login)
        .subscribe(users => {
            this.users = users['items'].slice(0, 10);
        });
  }

  /**
   * Método para obtener el username y los seguidores de los usuarios de GitHub
   */
  fetchFollowersAndUser(): any {
      this.users.forEach(user => {
        const login = user.login;
        this.usersService.getUser(login)
            .subscribe(rta => {
                const user = rta['login'];
                const followers = rta['followers'];
                this.userLogin.push(user);
                this.userFollowers.push(followers);
            });
      });
  }

  /**
   * Método para reiniciar el grafico.
   * El array de userFollowers y userLogin empezaran de 0, es decir, se eliminara la información que contengan.
   */
  restartChart(): void {
    this.userFollowers.splice(0);
    this.userLogin.splice(0);
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.userFollowers, label: 'Followers', backgroundColor: '#378461', hoverBackgroundColor: '#37846157'},
  ];

  /**
   * Llamara al método signOut de authService y si no hay problemas redireccionara a /auth/sign_in para iniciar sesión
   * de lo contrario saldrá una alerta.
   */
  signOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/auth/sign_in'])
          .catch(() => {
            alert('Ocurrió un error al cambiar de ruta, por favor vuélvelo a intentar.');
          });
    });
  }

}
