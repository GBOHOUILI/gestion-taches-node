// Mock des tâches (à remplacer par des données dynamiques)
const tasks = [
  { id: 1, title: 'Tâche 1', status: 'todo' },
  { id: 2, title: 'Tâche 2', status: 'inProgress' },
  { id: 3, title: 'Tâche 3', status: 'blocked' },
  { id: 4, title: 'Tâche 4', status: 'done' },
];

// Fonction pour afficher les tâches dans les colonnes
function renderTasks() {
  ['todo', 'inProgress', 'blocked', 'done'].forEach((status) => {
    const column = document.getElementById(status);
    column.innerHTML = ''; // Réinitialise la colonne
    tasks
      .filter((task) => task.status === status)
      .forEach((task) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'bg-blue-100 p-4 rounded shadow mb-2 cursor-pointer fade-in';
        taskCard.draggable = true;
        taskCard.textContent = task.title;
        taskCard.dataset.id = task.id;

        // Événements de drag & drop
        taskCard.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', task.id);
        });

        column.appendChild(taskCard);
      });
  });

  // Ajout de l'effet de fade-in
  applyFadeInEffect();
}

// Gestion du drag & drop
['todo', 'inProgress', 'blocked', 'done'].forEach((status) => {
  const column = document.getElementById(status);

  column.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  column.addEventListener('drop', (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const task = tasks.find((t) => t.id == taskId);
    task.status = status; // Met à jour le statut de la tâche
    renderTasks(); // Réaffiche les tâches
  });
});

// Fonction pour appliquer l'effet de fade-in
function applyFadeInEffect() {
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 200); // Décalage d'apparition
  });
}

// Gestion du modal
const modal = document.getElementById("taskModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => modal.classList.add("active"));
closeBtn.addEventListener("click", () => modal.classList.remove("active"));

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();

  // Ajout d'effet de fade-in pour les sections statiques
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 200);
  });
});