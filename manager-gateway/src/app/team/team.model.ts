import { User } from "../auth/user.model";

export class Team {
    public name: string;
    public users: User[];
    public leader: User;

    constructor(props: {}) {
        this.name = props['name'] ?? null;
        this.leader = new User(props['leader'] ?? {});

        const users = props['users'] ?? [];

        this.users = [];

        for (const userKey in users) {
            this.users.push(new User(users[userKey]));
        }
    }
}