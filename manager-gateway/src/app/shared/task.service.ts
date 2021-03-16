import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, flatMap, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../project/task/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    readonly tasks$: Observable<Task[]>;
    private readonly tasks = new BehaviorSubject<Task[]>([]);

    constructor(private http: HttpClient) {
        this.tasks$ = this.tasks.asObservable();
    }

    storeTask(name: string, description: string, projectId: number, type: string, userId: number) {
        return this.http.post(environment.baseUrl + 'tasks/store', {
            name: name,
            description: description,
            project_id: projectId,
            type: type,
            user_id: userId
        })
            .pipe(
                flatMap(() => this.getUserTasks())
            );
    }

    closeTask(id: number) {
        const params = {
            id: `${ id }`,

        }
        return this.http.delete(environment.baseUrl + 'tasks/delete', { params })
            .pipe(
                flatMap(() => this.getUserTasks())
            );
    }

    updateTask(id: number, name: string, description: string, type: string, userId: number) {
        return this.http.patch(environment.baseUrl + 'tasks/update', {
            id: id,
            name: name,
            description: description,
            type: type,
            user_id: userId
        });
    }

    getTasks(projectId: number, offset: number) {
        const params = {
            project: `${ projectId }`,
            offset: `${ offset }`
        }

        return this.http.get<Task[]>(environment.baseUrl + 'tasks', {
            params
        });
    }

    getUserTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(environment.baseUrl + 'tasks/user')
            .pipe(
                tap(tasks => this.tasks.next(tasks))
            );
    }

}
