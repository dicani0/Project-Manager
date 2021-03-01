import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    projects: Project[];
    isLoading: boolean;

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.loadProjects();

        this.projectService.updatedEventEmitter()
            .subscribe(() => {
                this.loadProjects();
            });
    }

    loadProjects() {
        this.isLoading = true;

        this.projectService.getProjects()
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(projects => {
                this.projects = projects;
            });
    }
}
