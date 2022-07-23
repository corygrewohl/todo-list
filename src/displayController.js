import {closeModal} from "./modal";
import {Project} from "./project";
import {Task} from "./task";

const currentProjectElement = document.querySelector(".current-project")
const projectArray = [];

/*
*   MAIN DISPLAY FUNCTIONS
*/
function displayProjects() {
    const projectList = document.getElementById("project-list");
    projectList.textContent = ""

    let index = 0;
    projectArray.forEach(project => {
        let projectButton = projectListDOMSetup(index, project)
        projectList.appendChild(projectButton)
        index++;
    });
}

function projectListDOMSetup(index, project) {
    const projectButtonContainer = document.createElement("div")
    projectButtonContainer.classList.add("project-list-container")

    const projectButton = document.createElement("button");

    projectButton.innerHTML = project.name
    projectButton.setAttribute("data-index", index);
    projectButton.addEventListener("click", () => {
        console.log(projectButton.innerHTML)
        currentProjectElement.id = projectButton.dataset.index
        updateHeaderProject()
        highlightActiveTab()
        displayTasks()
    })
    projectButtonContainer.appendChild(projectButton)

    const deleteProjectButton = document.createElement("button")
    deleteProjectButton.innerHTML = "&times;"
    deleteProjectButton.addEventListener("click", deleteProject)
    projectButtonContainer.appendChild(deleteProjectButton)


    return projectButtonContainer;
}

function updateHeaderProject(){
    const headerTitle = document.getElementById("header-title")
    headerTitle.textContent = "Current Project: " + projectArray[currentProjectElement.id].name
}

function highlightActiveTab(){
    const projectList = document.getElementById("project-list").getElementsByTagName('div')
    for (let i = 0; i < projectList.length; i++){
        projectList[i].classList.remove("active-project")
    }
    projectList[currentProjectElement.id].classList.add("active-project");
    projectList[currentProjectElement.id].childNodes[0].classList.add("active-project")

}

function displayTasks(){
    if(projectArray.length === 0){
        alert("Oops you haven't made a project yet!")
        console.log("must create a project before being able to display tasks")
        console.log(currentProjectElement.id)
        return;
    }

    if(currentProjectElement.id == ""){
        alert("Choose a project to add a task to first!")
        console.log("select a project first")
        console.log(currentProjectElement.id)
        return;
    }

    console.log("id: " + currentProjectElement.id)
    const taskGrid = document.getElementById("task-grid")
    taskGrid.textContent = ""

    projectArray[currentProjectElement.id].taskArray.forEach(task => {
        const projectTask = document.createElement("div");
        projectTask.innerHTML = task.title
        projectTask.classList.add("task-grid-item")
        console.log(task)
        taskGrid.appendChild(projectTask);

    })
}

function formatTask() {

}
////////////////////////////////////////

/*
*  PROJECT FUNCTIONS
*/
function newProjectSubmit() {
    const projectInput = document.getElementById("project-name");
    createProject(projectInput.value);
    projectInput.value = "";
    closeModal();
}

function createProject(name) {
    console.log(projectArray)
    let newProject = new Project(name);
    projectArray.push(newProject);
    displayProjects()
    console.log(projectArray)
}

function cancelNewProject() {
    const projectInput = document.getElementById("project-name");
    projectInput.value = "";
    closeModal();
}

function deleteProject(e){
    // const projectList = document.getElementById("project-list");
    // projectList.removeChild(e.target.parentElement)

    console.log(projectArray)
    let indexToRemove = e.target.previousElementSibling.dataset.index
    projectArray.splice(indexToRemove, 1)
    displayProjects()
    clearCurrentProject(indexToRemove)
    console.log(projectArray)

}

function clearCurrentProject(index){
    if(currentProjectElement.id == index){
        document.getElementById("task-grid").innerHTML = "";
        document.getElementById("header-title").textContent = "";
        currentProjectElement.id = "";
    }
}

//////////////////////


/*
*   TASK FUNCTIONS
 */
function createTask(
    project,
    title,
    description,
    dueDate,
    priority,
    difficulty
) {
    console.log();
    if (projectArray.length === 0) {
        closeModal();
        return;
    }
    if(project == ""){
        closeModal();
        return;
    }

    let newTask = new Task(title, description, dueDate, priority, difficulty);
    projectArray[project].taskArray.push(newTask);
    console.log(projectArray);

    closeModal();
}

function getData() {
    const form = document.getElementById("modal-task-body");
    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        const EventForm = new FormData(event.target);
        const title = EventForm.get("title");
        const description = EventForm.get("description");
        const dueDate = EventForm.get("dueDate");
        const priority = EventForm.get("priority");

        createTask(currentProjectElement.id, title, description, dueDate, priority, "forgot to add difficulty to form D:");
        form.reset();

        displayTasks()
    });
}

function cancelNewTask(){
    const taskForm = document.getElementById("modal-task-body")
    taskForm.reset()
    closeModal();
}

/////////////////

export {newProjectSubmit, cancelNewProject, getData, cancelNewTask}