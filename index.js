
const inputText = document.getElementById('input-text')
const listContainer = document.getElementById('list-container')

function addTask() {
    if (inputText.value.trim() === '') {
      alert('Enter something ....');
    } else {
      // Create a new list item
      let li = document.createElement('li');
      li.className = "list-group-item d-flex align-items-center justify-content-between border-0 bg-transparent";
  
      // Checkbox and Label
      let formCheckDiv = document.createElement('div');
      formCheckDiv.className = "form-check";
  
      let checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
  
      let label = document.createElement('label');
      label.className = "form-check-label";
      label.textContent = inputText.value;
  
      formCheckDiv.appendChild(checkbox);
      formCheckDiv.appendChild(label);
  
      let actionsDiv = document.createElement('div');
      actionsDiv.className = "d-flex flex-column flex-sm-row align-items-center gap-2";
  
      let editButton = document.createElement('a');
      editButton.href = "#!";
      editButton.className = "text-info";
      editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
      editButton.title = "Edit todo";
      editButton.onclick = () => editTask(label);

      let deleteButton = document.createElement('a');
      deleteButton.href = "#!";
      deleteButton.className = "text-danger";
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.title = "Delete todo";
      deleteButton.onclick = () => {
        li.remove()
        saveData()
    };
  
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
  
      li.appendChild(formCheckDiv);
      li.appendChild(actionsDiv);

      listContainer.appendChild(li);

      inputText.value = '';
      saveData()
    }
  }
  
  function editTask(label) {
    const updatedTask = prompt('Edit your task:', label.textContent);
    if (updatedTask !== null) {
      label.textContent = updatedTask.trim();
    }
  }

  function saveData(){
    localStorage.setItem('data', listContainer.innerHTML)
  }

  function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    const deleteButtons = listContainer.querySelectorAll('.text-danger');
    deleteButtons.forEach(button => {
      button.onclick = () => {
        button.closest('li').remove();
        saveData();
      };
    });

    const editButtons = listContainer.querySelectorAll('.text-info');
  editButtons.forEach(button => {
    button.onclick = () => {
      const label = button.closest('li').querySelector('label');
      editTask(label);
    };
  });
}

  showTask()