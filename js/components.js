export const createTaskCard = (task) => {
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.innerHTML = `
    <div class="task-card__label">${task.label}</div>
    <div class="task-card__dates-container">
      <div class="task-card__start-date">Start: ${new Date(task.start_date).toLocaleString()}</div>
      <div class="task-card__end-date">${task.end_date ? `End: ${new Date(task.end_date).toLocaleString()}` : ''}</div>
    </div>
  `;
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `
    <div class="task-card__description">${task.description}</div>
  `;
  const cardActions = document.createElement('div');
  cardActions.classList.add('task-card__actions-conainer');
  cardActions.innerHTML = `
    <button class="task-card__end-action" data-action="finish" data-label=${task.label}>Finish</button>
    <button class="task-card__delete-action" data-action="delete" data-label=${task.label}>Delete</button>
  `;
  const card = document.createElement('div');
  card.classList.add('task-card', 'card_grid__item');
  card.dataset.label = task.label;
  card.dataset.end_date = task.end_date;
  card.dataset.start_date = task.start_date;
  card.dataset.description = task.description;
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardActions);
  return card;
};