import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-user-projects',
    templateUrl: './user-projects.component.html',
    styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

    projects$: Observable<Project[]>;

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projects$ = this.projectService.getUserProjects();
    }

}
