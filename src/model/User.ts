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
};

export const toUserRole = (value: string): USER_ROLES => {
    return (value === "NORMAL") ? USER_ROLES.NORMAL : USER_ROLES.ADMIN;
} 