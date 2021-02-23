import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from './project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: Project[];
    projects$ = new Subject<Project[]>();

    constructor(private http: HttpClient) { }

    getProjects() {
        this.http.get<Project[]>(environment.baseUrl + 'projects')
            .pipe(
                map(
                    projects => projects.map(
                        project => new Project(project)
                    )
                ))
            .subscribe(projects => {
                this.projects = projects;
                this.projects$.next(this.projects);
            });
    }

    getProject(id: number) {
        console.log(environment.baseUrl + 'projects/' + id);
        return this.http.get<Project>(environment.baseUrl + 'projects/' + id)
            .pipe(
                map(project => {
                    console.log(project);
                    return new Project(project)
                })
            );
    }
}
