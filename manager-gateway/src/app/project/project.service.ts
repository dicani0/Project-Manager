import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
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
        return this.http.get<Project>(environment.baseUrl + 'projects/' + id)
            .pipe(
                map(project => {
                    return new Project(project)
                })
            );
    }

    updateProject(id: number, name: string, description: string, teamId: number, sDate: Moment, fDate: Moment) {
        this.http.patch(environment.baseUrl + 'projects/update', {
            id: id,
            name: name,
            description: description,
            team: teamId,
            start_date: sDate.format('YYYY-MM-DD HH:mm'),
            finish_date: fDate.format('YYYY-MM-DD HH:mm')
        }).subscribe(res => console.log(res));
    }
}
