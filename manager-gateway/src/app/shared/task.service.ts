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
                // map(tasks => tasks.map(task => new Task(task))),
                tap(tasks => this.updateList(tasks)),
                tap(() => this.tasks$)
            );
    }

    private updateList(tasks: Task[]): void {
        const ids = tasks.map(task => task.id);
        this.tasks.next([
            ...this.tasks.value.filter(({ id }) => !ids.includes(id)),
            ...tasks
        ]);
    }
}
