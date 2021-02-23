import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    id: number;
    private sub: any;
    project: Project;

    constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.projectService.getProject(this.id).subscribe(project => {
                console.log(project);
                this.project = project;
            });
        })
    }

}
