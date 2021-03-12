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
    teams$ = new Subject<Team[]>();
    teams: Team[];

    constructor(private http: HttpClient) { }

    getTeams() {
        this.http.get<Team[]>(environment.baseUrl + 'teams')
            .pipe(
                map(
                    teams => {
                        return teams.map(
                            team => new Team(team))
                    }
                )
            ).subscribe(teams => {
                this.teams = teams.slice();
                this.teams$.next(this.teams);
            });
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
        }).subscribe((team) => {
            this.teams.push(new Team(team));
            this.teams$.next(this.teams);
        });

    }

    updateTeam(id: number, name: string, leader: number, members: number[]) {
        this.http.put(environment.baseUrl + 'teams/update', {
            id: id,
            name: name,
            leader: leader,
            members: members
        }).subscribe(team => {
            this.getTeams();
            this.teams$.next(this.teams);
        });
    }

    setAddMode() {
        this.addMode.next(true);
    }

    disableAddMode() {
        this.addMode.next(false);
    }
}
