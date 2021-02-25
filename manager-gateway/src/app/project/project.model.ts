import { Team } from "../team/team.model";
import * as moment from 'moment';

export class Project {
    id: number;
    name: string;
    description: string;
    startDate: moment.Moment;
    finishDate: moment.Moment;
    team: Team;

    constructor(props) {
        this.id = props['id'];
        this.name = props['name'];
        this.description = props['description'];
        this.startDate = moment(props['start_date']);
        this.finishDate = moment(props['start_date']);
        this.team = new Team(props['team']);
    }
}