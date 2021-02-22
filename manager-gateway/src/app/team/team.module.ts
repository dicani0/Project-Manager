import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamComponent } from './team.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';



@NgModule({
    declarations: [
        TeamComponent,
        TeamFormComponent,
        TeamDetailComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
    ]
})
export class TeamModule { }
