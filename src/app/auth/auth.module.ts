import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [LoginComponent, SignUpComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ]
})
export class AuthModule { }
