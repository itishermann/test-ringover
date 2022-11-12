import TaskApi from './api.js';
import { createTaskCard } from './components.js';

function fetchTasks() {
  TaskApi.getAllTasks().then(tasks => {
    tasks.forEach(task => {
      const card = createTaskCard(task);
      document.querySelector('#tasks').appendChild(card);
    })
  });
}

function init() {
  // Get all tasks
  fetchTasks();
  // Add event listener to create task form
  document
    .getElementById('add-new-todo')
    .addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById('form__loader').classList.add('form__loading');
      const task = {
        label: document.getElementById('label').value,
        description: document.getElementById('description').value,
        start_date: new Date(document.getElementById('start_date').value).toISOString(),
      };
      TaskApi.createTask(task).then((status) => {
        document.getElementById('form__loader').classList.remove('form__loading');
        switch (status) {
          case 201:
            const card = createTaskCard(task);
            document.querySelector('#tasks').appendChild(card);
            document.getElementById('form__status').classList.add('form__status--success');
            document.getElementById('form__status').innerHTML = 'Task created successfully';
            // Reset form
            document.getElementById('add-new-todo').reset();
            break;
          case 400:
            document.getElementById('form__status').classList.add('form__status--error');
            document.getElementById('form__status').innerHTML = 'Invalid task';
            break;
          case 409:
            document.getElementById('form__status').classList.add('form__status--error');
            document.getElementById('form__status').innerHTML = 'Task already exists';
            break;
          default:
            document.getElementById('form__status').classList.add('form__status--error');
            document.getElementById('form__status').innerHTML = 'Unknown error';
        }
      });
    })

  // Add event listener to task cards
  document
    .getElementById('tasks')
    .addEventListener("click", function (e) {
      // if it's not a button, return
      if (!e.target.matches('button')) return;
      const action = e.target.dataset.action;
      const label = e.target.dataset.label;
      if (!action || !label) return;
      switch (action) {
        case 'finish':
          TaskApi.updateTask(label, new Date().toISOString()).then((status) => {
            switch (status) {
              case 200:
                TaskApi.getTask(label).then(task => {
                  const card = createTaskCard(task);
                  e.target.parentElement.parentElement.replaceWith(card);
                });
                break;
              case 404:
                alert('Task not found');
                break;
              default:
                alert('Unknown error');
            }
          });
          break;
        case 'delete':
          TaskApi.deleteTask(label).then((status) => {
            switch (status) {
              case 200:
                e.target.parentElement.parentElement.remove();
                break;
              case 404:
                alert('Task not found');
                break;
              default:
                alert('Unknown error');
            }
          });
          break;
        default:
          break;
      }
    });
}

window.addEventListener('load', init);