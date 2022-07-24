//Can create tasks that get stored in a specific project's array
class Task {
    constructor (title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }

    pushToParentProject(parentProjectArray){
        parentProjectArray.push(this)
    }

    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }

    get dueDate(){
        return this._dueDate;
    }

    get priority(){
        return this._priority;
    }
}

export { Task }