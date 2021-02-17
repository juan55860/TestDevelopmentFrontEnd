import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from 'src/app/search/components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: ':login',
        component: UserInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SearchRoutingModule { }
