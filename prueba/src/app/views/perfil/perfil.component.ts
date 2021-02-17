import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchModel } from 'src/app/shared/model/search.model';
import { CrudServiceService } from '../../shared/service/crud-service.service';
import Swal from 'sweetalert2';
import { PerfilModel } from "src/app/shared/model/perfil.model";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: string;
  usuario: string ;
  url = "https://api.github.com/users/";
  busqueda: SearchModel = new SearchModel();
  model: Array<PerfilModel>;
  datos: Array<PerfilModel>;
  avatar:string;
  login:string;
  direccion:string;
  repos: number;
  followers: number;



  constructor(
    private ActiveRoute: ActivatedRoute,
    private router:Router,
    private crudServices: CrudServiceService)
     {
    this.model = [];
   }

  ngOnInit(): void {
    this.perfil = this.ActiveRoute.snapshot.params.perfil;
    this.usuario= localStorage.getItem('id');
    this.safeRoute();
    this.getUsers();
  }
  safeRoute(){
    if (this.isLogin) {
      return;
    }else{
      this.router.navigateByUrl('/logout');
    }
  }

  isLogin(){
    return (this.usuario !=="")?true:false;
  }

  getUsers(): any {
    console.log(this.url+this.perfil);

    this.crudServices.getModel(this.url,this.perfil).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'top-end', icon: 'info', title: 'No hay datos registrados',
            showConfirmButton: false, timer: 1500
          });
        } else {
          this.model = data;
          this.avatar = this.model['avatar_url'];
          this.login= this.model['login'];
          this.direccion= this.model['url'];
          this.repos= this.model['repos_url'];
          this.followers= this.model['followers'];






        }
      });
  }
}
