import moment from "moment";

export enum TypePost {
    NORMAL = 'Normal',
    EVENTO = 'Evento'
};

export class Post {
    constructor(
        private user_id: string,
        private post_id: string,
        private photo: string,
        private description: string,
        private creation_date: string = moment().format("YYYY-MM-DD"),
        private type: TypePost
    ) {
        (this.type === "Normal") ? this.type = TypePost.NORMAL : this.type = TypePost.EVENTO;
    }

    public getId = () => this.user_id;
    public getPost = () => this.post_id;
    public getPhoto = () => this.photo;
    public getDescription = () => this.description;
    public getCreationDate = () => this.creation_date;
    public getType = () => this.type;
};