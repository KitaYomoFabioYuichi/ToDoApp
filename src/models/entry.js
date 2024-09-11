export default class Entry{
    constructor({
        id,
        title = "",
        description = "",
        datetime = null,
        type = "task",
        status = "in_progress"
    }){
        this.id = id;
        this.title = title;
        this.description = description;
        this.datetime = datetime;
        this.type = type;
        this.status = status;
    }
}