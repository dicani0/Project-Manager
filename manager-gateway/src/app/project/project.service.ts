import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from './project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: Project[];
    eventEmitter$ = new Subject<Observable<Project[]>>();

    constructor(private http: HttpClient) {
        this.projects = [];
    }

    getProjects() {
        return this.http.get<Project[]>(environment.baseUrl + 'projects')
            .pipe(
                map(
                    projects => projects.map(
                        project => new Project(project)
                    )
                ));
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
        this.http.patch<Project>(environment.baseUrl + 'projects/update', {
            id: id,
            name: name,
            description: description,
            team: teamId,
            start_date: sDate.format('YYYY-MM-DD HH:mm:ss'),
            finish_date: fDate.format('YYYY-MM-DD HH:mm:ss')
        })
            .subscribe(() => this.projectUpdated());
    }

    storeProject(name: string, description: string, teamId: number, sDate: Moment, fDate: Moment) {
        this.http.post<Project>(environment.baseUrl + 'projects/store', {
            name: name,
            description: description,
            team: teamId,
            start_date: sDate.format('YYYY-MM-DD HH:mm:ss'),
            finish_date: fDate.format('YYYY-MM-DD HH:mm:ss')
        }).subscribe(() => this.projectUpdated());
    }

    getUserProjects() {
        return this.http.get<Project[]>(environment.baseUrl + 'projects/user/');
    }

    updatedEventEmitter() {
        return this.eventEmitter$;
    }

    projectUpdated() {
        this.eventEmitter$.next();
    }
}
