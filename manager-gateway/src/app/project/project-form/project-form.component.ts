import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Team } from 'src/app/team/team.model';
import { TeamService } from 'src/app/team/team.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    @Input() project: Project;
    teams: Team[];
    editForm: FormGroup;

    constructor(private teamService: TeamService, private fb: FormBuilder, private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.teamService.teams$.subscribe(teams => this.teams = teams);
        this.teamService.getTeams();
        this.editForm = this.fb.group({
            name: [this.project.name],
            description: [this.project.description],
            team: [this.project.team.id],
            start_date: [this.project.startDate.format('YYYY-MM-DD[T]HH:mm')],
            finish_date: [this.project.finishDate.format('YYYY-MM-DD[T]HH:mm')]
        });
    }

    onSave() {
        this.projectService.updateProject(
            this.project.id,
            this.editForm.value.name,
            this.editForm.value.description,
            this.editForm.value.team,
            moment(this.editForm.value.start_date),
            moment(this.editForm.value.finish_date));
    }

}
