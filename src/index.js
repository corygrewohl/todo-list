import { addProjectModal, closeModal, addTaskModal } from "./modal.js";
import {
  cancelNewProject,
  newProjectSubmit,
  getData,
  cancelNewTask,
} from "./displayController.js";
import "./style.css";

setup();

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

  let taskCancel = document.getElementById("cancelTask");
  taskCancel.addEventListener("click", cancelNewTask, false);

  let overlay = document.getElementById("overlay");
  overlay.addEventListener("click", closeModal, false);
}
