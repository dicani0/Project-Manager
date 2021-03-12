import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../project/task/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    taskAdded$ = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    storeTask(name: string, description: string, projectId: number, type: string, userId: number) {
        return this.http.post(environment.baseUrl + 'tasks/store', {
            name: name,
            description: description,
            project_id: projectId,
            type: type,
            user_id: userId
        });
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
        let params = new HttpParams()
            .set('project', projectId.toString())
            .set('offset', offset.toString());

        return this.http.get<Task[]>(environment.baseUrl + 'tasks', {
            params
        })
            .pipe(
                map(tasks => {
                    return tasks.map(task => new Task(task));
                })
            )
    }

    getUserTasks() {
        return this.http.get<Task[]>(environment.baseUrl + 'tasks/user').pipe();
    }
}
