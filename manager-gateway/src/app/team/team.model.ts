import { User } from "../auth/user.model";

export class Team {
    public id: number;
    public name: string;
    public members: User[];
    public leader: User;

    constructor(props: {}) {
        this.id = props['id'] ?? null;
        this.name = props['name'] ?? null;
        this.leader = new User(props['leader'] ?? {});

        const members = props['members'] ?? [];

        this.members = [];
        for (const userKey in members) {
            this.members.push(new User(members[userKey]));
        }
    }
}