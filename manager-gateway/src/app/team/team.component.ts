import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    teams: Team[];
    isLoading: boolean;
    addMode: boolean;

    constructor(private teamService: TeamService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.addMode = false;
        this.teamService.getTeams().subscribe(teams => {
            this.teams = teams;
            this.isLoading = false;
        });
    }

    clickedOut(event) {
        if (event.target.id === "modal-form") {
            this.addMode = false;
        }
    }
}
