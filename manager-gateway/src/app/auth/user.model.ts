export class User {
    public id: number;
    public name: string;
    public email: string;

    constructor(props: {}) {
        this.id = props['id'] ?? null;
        this.name = props['name'] ?? null;
        this.email = props['email'] ?? null;
    }
}