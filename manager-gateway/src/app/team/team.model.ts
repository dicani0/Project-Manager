import { User } from "../auth/user.model";
import { Project } from "../project/project.model";

export class Team {
    public id: number;
    public name: string;
    public members: User[];
    public leader: User;
    public projects: Project[];

    constructor(props: {}, flag: boolean = true) {
        this.id = props['id'] ?? null;
        this.name = props['name'] ?? null;
        this.leader = new User(props['leader'] ?? {});

        const members = props['members'] ?? [];
        const projects = props['projects'] ?? [];

        this.members = [];
        this.projects = [];
        for (const userKey in members) {
            this.members.push(flag ? new User(members[userKey]) : members[userKey]);
        }
        for (const projectKey in projects) {
            this.projects.push(flag ? new Project(projects[projectKey], false) : projects[projectKey]);
        }
    }
}