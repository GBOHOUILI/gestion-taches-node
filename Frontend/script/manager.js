

const API_BASE_URL = 'http://localhost:8080/api/responsable';

// Fonction pour régénérer le token
async function renewToken() {
  try {
    const response = await fetch('http://localhost:8080/api/users/renew-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });

    if (!response.ok) {
      throw new Error('Impossible de renouveler le jeton.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log('Jeton renouvelé avec succès.');
    return data.token;
  } catch (error) {
    console.error('Erreur lors du renouvellement du jeton :', error);
    localStorage.removeItem('token');
    window.location.href = '/index.html';
  }
}

// Fonction générique pour effectuer des requêtes avec gestion du token
async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('token');
  if (!token) {
    console.error('Jeton non trouvé. Redirection vers la page de connexion.');
    window.location.href = '/login.html';
    return;
  }

  // Ajoutez le token dans les en-têtes
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  console.log('En-têtes de la requête :', options.headers);

  let response = await fetch(url, options);

  // Si le token est expiré, essayez de le régénérer
  if (response.status === 401) {
    console.warn('Jeton expiré. Tentative de régénération...');
    token = await renewToken();
    if (!token) return;

    // Réessayez la requête avec le nouveau token
    options.headers['Authorization'] = `Bearer ${token}`;
    response = await fetch(url, options);
  }

  if (!response.ok) {
    console.error(`Erreur HTTP: ${response.status}`);
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

// Récupérer les tâches
async function fetchTasks() {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/task`);
    return data.tasks;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
  }
}

// Récupérer les projets
async function fetchProjects() {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/projet`);
    return data.projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
  }
}

// Afficher les tâches dynamiquement
async function renderTasks() {
  try {
    const tasks = await fetchTasks();
    const tasksList = document.querySelector('.tasks-list');
    if (!tasks) {
      console.error('Aucune tâche trouvée ou erreur lors de la récupération.');
      tasksList.innerHTML = '<div class="no-tasks">Aucune tâche trouvée.</div>';
      return;
    }

    tasksList.innerHTML = '';
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <div class="task-header">
          <div class="task-title">${task.titre}</div>
          <div class="task-status status-${task.statut}">${task.statut}</div>
        </div>
        <div class="task-details">
          <div class="task-project">
            <span class="project-indicator project-web"></span>
            ${task.projet_id.titre}
          </div>
          <div class="task-assignee">
            <div class="assignee-avatar">${task.assignee.nom[0]}${task.assignee.prenoms[0]}</div>
            ${task.assignee.nom} ${task.assignee.prenoms}
          </div>
          <div class="task-date">Échéance: ${new Date(task.date_echeance).toLocaleDateString()}</div>
        </div>
      `;
      tasksList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    const tasksList = document.querySelector('.tasks-list');
    tasksList.innerHTML = '<div class="error">Erreur lors du chargement des tâches. Veuillez réessayer plus tard.</div>';
  }
}

// Afficher les projets dynamiquement
async function renderProjects() {
  try {
    const projects = await fetchProjects();
    const projectsList = document.querySelector('.projects-list');
    const totalProjectsElement = document.querySelector('#total-project');
    if (!projects) {
      console.error('Aucun projet trouvé ou erreur lors de la récupération.');
      projectsList.innerHTML = '<div class="no-projects">Aucun projet trouvé.</div>';
      if (totalProjectsElement) totalProjectsElement.textContent = 'Total projets : 0';
      return;
    }

    // Affichage du total
    if (totalProjectsElement) {
      totalProjectsElement.textContent = `${projects.length}`;
    }

    projectsList.innerHTML = '';
    projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = 'project-item';
      projectItem.innerHTML = `
        <div class="project-name">
          <span class="project-indicator project-web"></span>
          ${project.titre}
        </div>
        <div class="progress-info">
          <span>Progression</span>
          <span>${project.progression || 0}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-value progress-web" style="width: ${project.progression || 0}%;"></div>
        </div>
      `;
      projectsList.appendChild(projectItem);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
    const projectsList = document.querySelector('.projects-list');
    projectsList.innerHTML = '<div class="error">Erreur lors du chargement des projets. Veuillez réessayer plus tard.</div>';
    
    const totalProjectsElement = document.querySelector('.total-projects');
    if (totalProjectsElement) totalProjectsElement.textContent = 'Total projets : 0';
  }
}

function setupModal() {
  const addProject = document.getElementById("add-project");
  const createProjectModal = document.getElementById("createProjectModal");
  const closeBtn = document.getElementById("closeProjectModal");
  const cancelBtn = document.getElementById("cancelProjectBtn");

  if (!addProject || !createProjectModal || !closeBtn) {
    console.warn("Un ou plusieurs éléments manquent.");
    return;
  }

  addProject.addEventListener("click", (event) => {
    event.preventDefault(); 
    createProjectModal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    createProjectModal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    createProjectModal.style.display = "none";
  });
}



// Initialisation
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Jeton non trouvé. Redirection vers la page de connexion.');
    window.location.href = '/index.html';
    return;
  }
  setupModal();
  renderTasks();
  renderProjects();

});

