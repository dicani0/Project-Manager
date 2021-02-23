import { Component, Input, OnInit } from '@angular/core';
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
    chosenTeam: Team;

    constructor(private teamService: TeamService) { }

    ngOnInit(): void {

        this.isLoading = true;
        this.addMode = false;

        this.teamService.teams$.subscribe(teams => {
            this.teams = teams;
            this.isLoading = false
        })

        this.teamService.teams$.subscribe(teams => {
            this.teams = teams;
        });

        this.teamService.addMode.subscribe(mode => {
            this.addMode = mode;
        })

        this.teamService.chosenTeam.subscribe(team => this.chosenTeam = team);

        this.teamService.getTeams();
    }

    showDetails(id: number) {
        this.chosenTeam = this.teams.find(team => team.id === id);
        this.teamService.chooseTeam(this.chosenTeam);
    }

    onAdd() {
        this.teamService.setAddMode();
    }
}
