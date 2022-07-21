import { Project } from "./project.js";
import { Task } from "./task.js";
import { addProjectModal, closeModal, addTaskModal } from "./modal.js";
import "./style.css";

const projectArray = [];
setup();

function clearFormData(){
  //TODO
}

function createProject(name) {
  let newProject = new Project(name);
  projectArray.push(newProject);
  console.log(projectArray);
}

function newProjectSubmit() {
  const projectInput = document.getElementById("project-name");
  createProject(projectInput.value);
  projectInput.value = "";
  closeModal();
}

function cancelNewProject() {
  const projectInput = document.getElementById("project-name");
  projectInput.value = "";
  closeModal();
}

function cancelNewTask(){
  const taskForm = document.getElementById("modal-task-body")
  taskForm.reset()
  closeModal();
}

function createTask(
  project,
  title,
  description,
  dueDate,
  priority,
  difficulty
) {
  console.log();
  if (projectArray.length == 0) {
    closeModal();
    return;
  }
  let newTask = new Task(title, description, dueDate, priority, difficulty);
  projectArray[project].taskArray.push(newTask);
  console.log(projectArray);

  closeModal();
}

function testCreateTask() {
  createTask(
    0,
    "test title",
    "test desc",
    "test due date",
    "test priority",
    "test difficulty"
  );
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

    createTask(0, title, description, dueDate, priority, "forgot to add difficulty to form D:");
    form.reset();
  });
}

function setup() {
  let addProjectBtn = document.getElementById("add-project");
  addProjectBtn.addEventListener("click", addProjectModal, false);

  let projectSubmit = document.getElementById("submit");
  projectSubmit.addEventListener("click", newProjectSubmit, false);

  let projectCancel = document.getElementById("cancel");
  projectCancel.addEventListener("click", cancelNewProject, false);

  let addTaskBtn = document.getElementById("add-task");
  addTaskBtn.addEventListener("click", addTaskModal, false);

  let taskForm = document.getElementById("modal-task-body");
  taskForm.setAttribute("onsubmit", getData());

  let taskCancel = document.getElementById("cancelTask")
  taskCancel.addEventListener("click", cancelNewTask, false)

  let overlay = document.getElementById("overlay");
  overlay.addEventListener("click", closeModal, false)
}
