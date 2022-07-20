function addProjectModal() {
    const modal = document.getElementById("modal-container");
    const overlay = document.getElementById("overlay");
  
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  
  function closeModal(input) {
    let modal; 
    
    if(input === "project"){
      modal = document.getElementById("modal-container");
    } else {
      modal = document.getElementById("modal-container-task")
    }

    const overlay = document.getElementById("overlay");
  
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  function addTaskModal() {
    const modal = document.getElementById("modal-container-task");
    const overlay = document.getElementById("overlay");
  
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  export {addProjectModal, closeModal, addTaskModal}