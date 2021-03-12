import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../task.model';

@Component({
    selector: 'app-user-tasks',
    templateUrl: './user-tasks.component.html',
    styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {

    tasks$: Observable<Task[]>;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.tasks$ = this.taskService.getUserTasks();
    }

}
