import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectFormComponent } from './project-form/project-form.component';



@NgModule({
    declarations: [
        ProjectComponent,
        ProjectDetailsComponent,
        ProjectFormComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})
export class ProjectModule { }
