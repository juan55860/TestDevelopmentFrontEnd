import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';

import { UserModel } from '../../shared/model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  constructor(private router:Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  login(form:NgForm){
    if (  form.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    localStorage.setItem('id', this.user.id);
    localStorage.setItem('password', this.user.password);

    this.router.navigateByUrl('/busqueda');

    Swal.close();

  }
}
