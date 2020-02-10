export class Messages {
    id: number;
    username: string;
    message: string;
    date_created: string;
    likes: number;
    liked: string;

    constructor() {
        this.id = 0;
        this.username = "";
        this.message = "";
        this.date_created = "";
        this.likes = 0;
        this.liked = "";
    }
}
