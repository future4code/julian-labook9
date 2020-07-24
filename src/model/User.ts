export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
};

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
    ) {}
    
    public getId = () => this.id;
    public getName = () => this.name;
    public getEmail = () => this.email;
    public getPassword = () => this.password;
    public getRole = () => this.role;

    public setId = (id: string) => this.id = id;
    public setName = (name: string) => this.name = name;
    public setEmail = (email: string) => this.email = email;
};

export const toUserRole = (value: string): USER_ROLES => {
    return (value === "NORMAL") ? USER_ROLES.NORMAL : USER_ROLES.ADMIN;
} 