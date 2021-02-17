import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { SearchModel } from 'src/app/shared/model/search.model';
import { CrudServiceService } from '../../shared/service/crud-service.service';
import Swal from 'sweetalert2';
import { ResultModel } from "src/app/shared/model/result.model";



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  usuario: string = localStorage.getItem('id');
  url = "https://api.github.com/search/users?q=";
  busqueda: SearchModel = new SearchModel();
  model: Array<ResultModel>;
  datos: Array<ResultModel>;

  constructor(private router:Router,private crudServices: CrudServiceService) {
    this.model = [];
    this.busqueda.id="";

  }

  ngOnInit(): void {
    this.safeRoute()
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

  findUser(form:NgForm){
    if (this.busqueda.id=="") {
      return;
    }
    if (this.busqueda.id==null) {
      return;
    }
    if (this.busqueda.id=="TaxiaLife" || this.busqueda.id=="taxialife") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Palabra no permitida',
      })
      return;
    }
    if (this.busqueda.id.length<5) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Palabra muy corta',
      })
      return;
    }

    this.model = [];
    this.getUsers();
  }

  getUsers(): any {
    this.crudServices.getModel(this.url,this.busqueda.id).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'top-end', icon: 'info', title: 'No hay datos registrados',
            showConfirmButton: false, timer: 1500
          });
        } else {
          this.model = data;
          this.datos = this.model['items'] ;
          console.log(this.datos);

        }
      });
  }

}
