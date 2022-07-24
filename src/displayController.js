import {closeModal} from "./modal";
import {Project} from "./project";
import {Task} from "./task";
import {format} from "date-fns";

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
    document.getElementById("header-title").textContent = "Current Project: " + projectArray[currentProjectElement.id].name
}

//FIXME Styling needs fixing
function highlightActiveTab(){
    const projectList = document.getElementById("project-list").getElementsByTagName('div')
    for (let i = 0; i < projectList.length; i++){
        projectList[i].classList.remove("active-project")
    }
    projectList[currentProjectElement.id].classList.add("active-project");

}

function displayTasks(){
    if(projectArray.length === 0){
        alert("Oops you haven't made a project yet!")
        return;
    }
    if(currentProjectElement.id == ""){
        alert("Choose a project to add a task to first!")
        return;
    }
    const taskGrid = document.getElementById("task-grid")
    taskGrid.textContent = ""

    let index = 0
    projectArray[currentProjectElement.id].taskArray.forEach(task => {
        formatTask(task, taskGrid, index)
        index++
    })
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
    new Project(name).pushToProjectArray(projectArray)
    displayProjects()
}

function cancelNewProject() {
    const projectInput = document.getElementById("project-name");
    projectInput.value = "";
    closeModal();
}

function deleteProject(e){
    let indexToRemove = e.target.previousElementSibling.dataset.index
    projectArray.splice(indexToRemove, 1)
    displayProjects()
    clearCurrentProject(indexToRemove)
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
) {
    if (projectArray.length === 0 || project == "") {
        closeModal();
        return;
    }
    new Task(title, description, dueDate, priority).pushToParentProject(projectArray[project].taskArray);
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

        createTask(currentProjectElement.id, title, description, dueDate, priority);
        form.reset();

        displayTasks()
    });
}

function cancelNewTask(){
    const taskForm = document.getElementById("modal-task-body")
    taskForm.reset()
    closeModal();
}

function formatTask(task, taskGrid, index) {
    const projectTask = document.createElement("div");
    projectTask.setAttribute("data-taskNum", index)

    const projectTitle = document.createElement("p")
    projectTitle.textContent = task.title;
    projectTitle.classList.add("task-title")
    projectTask.appendChild(projectTitle)

    if(task.description !== ""){
        const projectDescription = document.createElement("p")
        projectDescription.textContent = `Description: ${task.description}`;
        projectTask.appendChild(projectDescription)
        console.log(task.description)
    }
    if(task.dueDate !== "") {
        const projectDueDate = document.createElement("p")
        const formattedDate = format(new Date(task.dueDate), "h':'mmaaa MM/dd/yyyy")
        projectDueDate.textContent = `Due Date: ${formattedDate}`
        projectTask.appendChild(projectDueDate)
        console.log(task.dueDate)
    }
    if(task.priority != null) {
        const projectPriority = document.createElement("p")
        projectPriority.textContent = `Priority: ${task.priority}`
        projectTask.appendChild(projectPriority)
        console.log(task.priority)
    }

    const deleteTaskButton = document.createElement("button")
    deleteTaskButton.innerHTML = "&times;"
    deleteTaskButton.addEventListener("click", deleteTask)
    deleteTaskButton.classList.add("delete-task-button")
    projectTask.appendChild(deleteTaskButton)

    projectTask.classList.add("task-grid-item")

    taskGrid.appendChild(projectTask);
}

function deleteTask(e){
    let indexToRemove = e.target.parentElement.dataset.tasknum
    projectArray[currentProjectElement.id].taskArray.splice(indexToRemove, 1)
    e.target.parentElement.remove()
}

/////////////////

export {newProjectSubmit, cancelNewProject, getData, cancelNewTask}