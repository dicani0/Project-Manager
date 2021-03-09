import { User } from "src/app/auth/user.model";

export class Task {
    id: number;
    name: string;
    description: string;
    type: string;
    user: User;

    constructor(props) {
        this.id = props['id'];
        this.name = props['name'];
        this.description = props['description'];
        this.type = props['type'];
        this.user = new User(props['user']);
    }
}