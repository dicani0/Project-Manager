import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { Team } from '../team.model';
import { TeamService } from '../team.service';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
    team: Team;
    users: Observable<User[]>;
    members: User[];
    teamForm: FormGroup;

    constructor(private teamService: TeamService, private userService: UserService, private fb: FormBuilder) {
        this.teamForm = this.fb.group({
            name: [],
            leader: [],
            users: []
        });

    }

    ngOnInit(): void {
        this.users = this.userService.getAllUsers();
    }

    clickedOut(event) {
        if (event.target.id === "modal-form") {
            this.close();
        }
    }

    onStoreTeam() {
        this.teamService.storeTeam(this.teamForm.value.name,
            this.teamForm.value.leader,
            this.teamForm.value.users);
        this.close();
    }

    close() {
        this.teamService.disableAddMode();
    }
}
