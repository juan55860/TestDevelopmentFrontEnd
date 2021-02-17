import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import {ChartsModule} from 'ng2-charts';

import { SearchComponent } from 'src/app/search/components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
    SearchComponent,
    UserInfoComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        ChartsModule,
        FontAwesomeModule
    ]
})
export class SearchModule { }
