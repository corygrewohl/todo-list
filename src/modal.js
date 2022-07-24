function addProjectModal() {
  const modal = document.getElementById("modal-container");
  const overlay = document.getElementById("overlay");

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  let modal;

  modal = document.getElementById("modal-container");
  modal.classList.remove("active");

  const overlay = document.getElementById("overlay");
  modal = document.getElementById("modal-container-task");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function addTaskModal() {
  if (document.querySelector(".current-project").id == "") {
    alert("Select a project or create one and select it first!");
    return;
  }

  const modal = document.getElementById("modal-container-task");
  const overlay = document.getElementById("overlay");

  modal.classList.add("active");
  overlay.classList.add("active");
}
export { addProjectModal, closeModal, addTaskModal };
