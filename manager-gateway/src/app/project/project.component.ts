import { Component, OnInit } from '@angular/core';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    projects: Project[];

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projectService.projects$.subscribe(projects => {
            this.projects = projects
        });
        this.projectService.getProjects();
    }

}
