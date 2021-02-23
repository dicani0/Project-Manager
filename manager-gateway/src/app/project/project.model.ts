import { Team } from "../team/team.model";
import * as moment from 'moment';

export class Project {
    id: number;
    name: string;
    description: string;
    startDate;
    finishDate;
    team: Team;

    constructor(props) {
        this.id = props['id'];
        this.name = props['name'];
        this.description = props['description'];
        this.startDate = moment(props['start_date']).format('DD-MM-YYYY H:m');
        this.finishDate = moment(props['start_date']).format('DD-MM-YYYY H:m');
        this.team = new Team(props['team']);
    }
}