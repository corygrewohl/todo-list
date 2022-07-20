import { Project } from "./project.js";
import { Task } from "./task.js";
import { addProjectModal, closeModal, addTaskModal } from "./modal.js";
import "./style.css";

const projectArray = [];
setup();

function createProject(name) {
  let newProject = new Project(name);
  projectArray.push(newProject);
  console.log(projectArray);
}

function newProjectSubmit() {
  const projectInput = document.getElementById("project-name");
  createProject(projectInput.value);
  projectInput.value = "";
  closeModal("project");
}

function cancelNewProject() {
  const projectInput = document.getElementById("project-name");
  projectInput.value = "";
  closeModal("project");
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
  if (projectArray.length == 0) return;
  let newTask = new Task(title, description, dueDate, priority, difficulty);
  projectArray[project].taskArray.push(newTask);
  console.log(projectArray);
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
    console.log(event.target[0].value);
  });
  const title = form[0].value;
  const description = form[1].value;
  const dueDate = form[2].value;

  // form?.addEventListener("submit", (event) => {
  //   event.preventDefault();
  
  //   const EventForm = new FormData(event.target);
    
  //   const Title = EventForm.get("title");
  //   console.log(Title);
  // });
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

}
