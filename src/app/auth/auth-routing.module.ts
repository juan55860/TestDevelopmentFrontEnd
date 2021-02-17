import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'sign_in',
        component: LoginComponent
    },
    {
        path: 'sign_up',
        component: SignUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
