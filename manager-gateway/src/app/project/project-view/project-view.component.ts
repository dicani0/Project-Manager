import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { TaskService } from 'src/app/shared/task.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Task } from '../task/task.model';

@Component({
    selector: 'app-project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
    id: number;
    project: Project;
    users: User[];
    tasks: Task[];
    isLoading: boolean;
    isAddMode: boolean;
    isEditMode: boolean;
    taskForm = this.fb.group({
        name: ['', Validators.required],
        user: [],
        type: [, Validators.required],
        description: ['', Validators.required]
    });

    taskEditForm = this.fb.group({
        editName: ['', Validators.required],
        editUser: [],
        editType: [, Validators.required],
        editDescription: ['', Validators.required]
    });

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private userService: UserService,
        private taskService: TaskService,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.isAddMode = false;
        this.isEditMode = false;
        this.isLoading = true;

        this.userService.getAllUsers().subscribe(users => this.users = users);

        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.projectService.getProject(+params['id']).subscribe(project => {
                this.project = project
                this.taskService.getTasks(this.project.id).subscribe(tasks => this.tasks = tasks);
                this.isLoading = false;
            });
        })

        this.taskService.taskAdded$.subscribe(() => {
            this.taskService.getTasks(this.project.id).subscribe(tasks => this.tasks = tasks);
        })

    }

    onSave() {
        this.taskService.storeTask(
            this.taskForm.value.name,
            this.taskForm.value.description,
            this.project.id,
            this.taskForm.value.type,
            this.taskForm.value.user
        ).subscribe(() => {
            this.taskService.taskAdded$.next(true);
            this.isAddMode = false;
        });
    }

    onEditMode(task: Task) {
        this.isEditMode = true;
        this.taskEditForm.patchValue({
            id: task.id,
            editName: task.name,
            editDescription: task.description,
            editUser: task.user.id,
            editType: task.type
        });
    }

    onUpdate() {
        this.taskService.updateTask(
            this.taskEditForm.value.id,
            this.taskEditForm.value.editName,
            this.taskEditForm.value.editDescription,
            this.taskEditForm.value.editType,
            this.taskEditForm.value.editUser
        ).subscribe();
    }

    closeForm() {
        this.isAddMode = false;
    }
}
