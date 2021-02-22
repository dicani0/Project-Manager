import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { Team } from '../team.model';
import { TeamService } from '../team.service';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

    chosenTeam: Team;
    editMode: boolean = false;
    editForm: FormGroup;
    users: Observable<User[]>;
    isLoading: boolean = true;

    constructor(private teamService: TeamService, private fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit(): void {
        this.teamService.chosenTeam.subscribe(team => {
            this.chosenTeam = team;
            this.users = this.userService.getAllUsers();
            let usersIds = [];
            this.chosenTeam.members.forEach(member => {
                usersIds.push(member.id);
            })
            this.editForm = this.fb.group({
                name: [this.chosenTeam.name],
                leader: [this.chosenTeam.leader.id],
                users: [usersIds]
            });
        });
        this.isLoading = false;
    }

    onUpdate() {
        this.teamService.updateTeam(this.chosenTeam.id, this.editForm.value.name, this.editForm.value.leader, this.editForm.value.members)
    }

    close() {
        this.teamService.clearTeam();
    }

}
