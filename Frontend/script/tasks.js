document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.querySelector('#todo .task-list');
  const inProgressList = document.querySelector('#inProgress .task-list');
  const doneList = document.querySelector('#done .task-list');
  const modal = document.getElementById('taskModal');
  const closeModal = document.getElementById('closeModal');
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');
  const taskTime = document.getElementById('taskTime');

  // Liste des tâches assignées
  const assignedTasks = [
    { title: "Corriger bug login", description: "Corriger le bug sur la page de connexion", time: "2 heures" },
    { title: "Mettre à jour profil", description: "Ajouter la fonctionnalité d’édition du profil", time: "3 heures" },
    { title: "Créer une page d'accueil", description: "Développer la page d'accueil du site", time: "5 heures" },
  ];

  // Générer les tâches dans la colonne "À faire"
  assignedTasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.className = 'bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100';
    taskCard.innerHTML = `
      <h4 class="font-semibold">${task.title}</h4>
      <p class="text-sm text-gray-600 truncate">${task.description}</p>
    `;
    // Ajouter un événement de clic pour afficher les détails dans le modal
    taskCard.addEventListener('click', () => {
      taskTitle.textContent = task.title;
      taskDescription.textContent = task.description;
      taskTime.textContent = `Temps requis : ${task.time}`;
      modal.classList.remove('hidden');
    });
    todoList.appendChild(taskCard);
  });

  // Activer le Drag & Drop avec Sortable.js
  const lists = [todoList, inProgressList, doneList];
  lists.forEach(list => {
    new Sortable(list, {
      group: 'tasks', // Permet de déplacer les tâches entre les colonnes
      animation: 150, // Animation fluide
      onEnd: (evt) => {
        console.log(`Tâche déplacée de ${evt.from.id} à ${evt.to.id}`);
      },
    });
  });

  // Fermer le modal
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Fermer le modal en cliquant en dehors
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});