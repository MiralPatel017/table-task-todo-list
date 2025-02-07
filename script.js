let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.querySelector('form').addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault(); // Prevent the default form submission

    const titleInput = document.getElementById('floatingInput');
    const descriptionInput = document.getElementById('floatingTextarea');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === '' || description === '') {
        alert('Please enter both title and description.');
        return;
    }

    const task = { title, description };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTaskList(); // Re-render the entire list to reflect the new task

    // Clear the inputs
    titleInput.value = '';
    descriptionInput.value = '';
}

function renderTaskList() {
    const taskList = document.getElementById('tasklist');
    taskList.innerHTML = ''; // Clear the existing list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex lis justify-content-between align-items-start';

        const taskContent = document.createElement('div');
        taskContent.innerHTML = `<div><strong>${task.title}</strong></div><div>${task.description}</div>`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-warning btn-sm mx-1';
        editButton.addEventListener('click', () => editTask(li, task.title, task.description, index));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTaskList(); // Re-render the list to reflect the deletion
            }
        });

        li.appendChild(taskContent);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

function editTask(li, originalTitle, originalDescription, index) {
    const titleInput = document.createElement('input');
    titleInput.value = originalTitle;
    titleInput.className = 'form-control me-2';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = originalDescription;
    descriptionInput.className = 'form-control me-2';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'btn btn-success btn-sm mx-1';

    saveButton.addEventListener('click', () => {
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();

        if (newTitle === '' || newDescription === '') {
            alert('Please enter both title and description.');
            return;
        }

        // Update the task at the current index
        tasks[index] = { title: newTitle, description: newDescription };
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTaskList(); // Re-render the list to reflect the updated task
    });

    // Clear the existing list item and add input fields for editing
    li.innerHTML = '';
    li.appendChild(titleInput);
    li.appendChild(descriptionInput);
    li.appendChild(saveButton);
}

// Load tasks from local storage on page load
window.onload = function() {
    renderTaskList(); // Render the task list on page load
};