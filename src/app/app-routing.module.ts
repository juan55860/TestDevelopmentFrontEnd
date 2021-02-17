import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PageNotFoundComponent} from 'src/app/page-not-found/page-not-found.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/sign_up',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ],
  },
  {
    path: 'search',
    canActivate: [AdminGuard],
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
