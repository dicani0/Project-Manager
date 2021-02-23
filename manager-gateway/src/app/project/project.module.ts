import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        ProjectComponent,
        ProjectDetailsComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        RouterModule
    ]
})
export class ProjectModule { }
