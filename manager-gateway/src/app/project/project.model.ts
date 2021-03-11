import { Team } from "../team/team.model";
import * as moment from 'moment';
import { Task } from "./task/task.model";

export class Project {
    id: number;
    name: string;
    description: string;
    startDate: moment.Moment;
    finishDate: moment.Moment;
    team: Team;
    tasks: Task[];
    taskAmount: number;

    constructor(props, flag: boolean = true) {
        this.taskAmount = props['amount'];
        this.id = props['id'];
        this.name = props['name'];
        this.description = props['description'];
        this.startDate = moment(props['start_date']);
        this.finishDate = moment(props['start_date']);
        this.team = flag ? new Team(props['team'], false) : props['team'];
        this.tasks = [];
        const tasks = props['tasks'] ?? [];
        for (let index in tasks) {
            this.tasks.push(new Task(tasks[index]));
        }
    }
}