import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Team } from './team.model';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    chosenTeam = new BehaviorSubject<Team>(null);
    addMode = new Subject<boolean>();
    teams = new Subject<Team[]>();
    teamss: Team[];

    constructor(private http: HttpClient) { }

    getTeams() {
        return this.http.get<Team[]>(environment.baseUrl + 'teams')
            .pipe(
                map(
                    teams => teams.map(
                        team => new Team(team))
                )
            );
    }

    passTeams() {
        this.getTeams().subscribe();
        this.teams.next(this.teamss);
    }

    chooseTeam(team: Team) {
        this.chosenTeam.next(team);
    }

    clearTeam() {
        this.chosenTeam.next(null);
    }

    storeTeam(name: string, leader: number, members: number[]) {
        this.http.post(environment.baseUrl + 'teams/store', {
            name: name,
            leader: leader,
            members: members
        }).subscribe();
    }

    updateTeam(id: number, name: string, leader: number, members: number[]) {
        this.http.put(environment.baseUrl + 'teams/update', {
            id: id,
            name: name,
            leader: leader,
            members: members
        }).subscribe();
    }

    setAddMode() {
        this.addMode.next(true);
    }

    disableAddMode() {
        this.addMode.next(false);
    }
}
