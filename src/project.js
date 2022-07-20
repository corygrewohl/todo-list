//Can create project objects that get stored in the project array to be created on the sidebar
class Project {
    constructor(name){
        this._name = name;   
        this._taskArray = [];
    }

    get name(){
        return this._name;
    }

    get taskArray(){
        return this._taskArray;
    }

    pushToProjectArray(projArr){
        projArr.push(this);
    }
}

export { Project };