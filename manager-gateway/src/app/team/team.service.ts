import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Team } from './team.model';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private http: HttpClient) { }

    getTeams() {
        return this.http.get<Team[]>(environment.baseUrl + 'teams')
            .pipe(
                map(teams => teams.map(team => new Team(team))));
    }
}
