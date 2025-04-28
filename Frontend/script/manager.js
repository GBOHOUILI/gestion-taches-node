

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

function getInitials(nom, prenoms) {
  const initialNom = nom ? nom.trim().charAt(0).toUpperCase() : '';
  const initialPrenoms = prenoms ? prenoms.trim().charAt(0).toUpperCase() : '';
  return initialNom + initialPrenoms;
}




// Récupérer et afficher les informations du responsable
async function fetchResponsableInfo() {
  try {
    const userInfo = localStorage.getItem('user');
    const user = JSON.parse(userInfo);
    const userName = document.getElementById('userName');
    if (userName) {
      userName.textContent = `${user.nom}`;
    }
  
    const userRole = document.getElementById('userRole');
    if (userRole) {
      userRole.textContent = `Role: ${user.role}`;
    }
    const selectResponsable = document.getElementById('projectResponsible');
    if (selectResponsable) {
      const option = document.createElement('option');
      option.value = user._id;
      option.textContent = `${user.nom} ${user.prenoms}`;
      option.selected = true;
      selectResponsable.innerHTML = '';
      const avatarText = getInitials(user.nom, user.prenoms);

      const userAvatar = document.querySelector('.user-avatar');
      if (userAvatar) {
        userAvatar.textContent = avatarText;
      }
      if (document.querySelector('.profile-btn')) {
      document.querySelector('.profile-btn').textContent = avatarText;
      }
    
    // Ajouter l'option à la liste déroulante
    selectResponsable.appendChild(option);
    }
    return user
    
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du responsable :', error);
  }
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

async function fetchMembers() {
  try {
    const data = await fetchWithAuth(`${API_BASE_URL}/projet/users`);
    return data.users;

  } catch (error) {
    console.error('Erreur lors de la récupération des membres :', error);
  }
}

// Afficher les tâches dynamiquement
async function renderTasks() {
  try {
    const tasks = await fetchTasks();
    const tasksList = document.querySelector('.tasks-list');
    if (tasksList) {
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
    }

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
    const projectGrid = document.querySelector(".projects-grid")
    function formatDateRange(startISO, endISO) {
      const options = { day: '2-digit', month: 'short' };
      const startDate = new Date(startISO);
      const endDate = new Date(endISO);
    
      const start = startDate.toLocaleDateString('en-GB', options);
      const end = endDate.toLocaleDateString('en-GB', options);
      const year = endDate.getFullYear();
    
      return `${start} - ${end} ${year}`;
    }

    if (!projects) {
      console.error('Aucun projet trouvé ou erreur lors de la récupération.');
      if (projectsList) {
        projectsList.innerHTML = '<div class="no-projects">Aucun projet trouvé.</div>';
      }

      if (totalProjectsElement) totalProjectsElement.textContent = 'Total projets : 0';
      return;
    }

    // Affichage du total
    if (totalProjectsElement) {
      totalProjectsElement.textContent = `${projects.length}`;
    }
    if (projectsList) {
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
          </div>`
          projectsList.appendChild(projectItem);

      })
      };
      
      if (projectGrid) {
        projects.forEach(projet => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card-header';
        projectCard.innerHTML = `
  <div class="project-card" data-status="active">
                      <div class="card-header">
                          <span class="status-badge active">En cours</span>
                          <div class="dropdown">
                              <button class="dropdown-btn"><i class="fa fa-ellipsis-v"></i></button>
                              <div class="dropdown-content">
                                  <a href="#"><i class="fa fa-star"></i> Favoris</a>
                                  <a href="#"><i class="fa fa-bell"></i> Notifications</a>
                                  <a href="#"><i class="fa fa-archive"></i> Archiver</a>
                              </div>
                          </div>
                      </div>
                      <div class="card-body">
                          <h3>${projet.titre}</h3>
                          <p class="card-description">${projet.description}</p>
                          <div class="project-meta">
                              <div class="meta-item">
                                  <i class="fa fa-user"></i>
                                  <span></span>
                              </div>
                              <div class="meta-item">
                                  <i class="fa fa-calendar"></i>
                                  <span>${formatDateRange(projet.date_debut, projet.date_fin)}</span>
                              </div>
                          </div>
                          <div class="progress-container">
                              <div class="progress-info">
                                  <span>Progression</span>
                                  <span class="progress-percentage">35%</span>
                              </div>
                              <div class="progress-bar">
                                  <div class="progress-fill" style="width: 35;"></div>
                              </div>
                          </div>
                          <div class="members-preview">
                              <div class="avatar" title="Member 1">M1</div>
                              <div class="avatar" title="Member 2">M2</div>
                              <div class="avatar more">${projet.membres.length}</div>
                          </div>
                      </div>
                      <div class="card-actions">
                          <button class="btn-view" value= "${projet._id}"><i class="fa fa-eye"></i> Voir</button>
                          <button class="btn-edit" value= "${projet._id}"><i class="fa fa-edit"></i> Modifier</button>
                          <button class="btn-delete" value= "${projet._id}"><i class="fa fa-trash"></i> Supprimer</button>
                      </div>
                  </div>`;
        projectGrid.appendChild(projectCard)
      })
    }

}catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
    const projectsList = document.querySelector('.projects-list');
    if (projectsList) {
      projectsList.innerHTML = '<div class="error">Erreur lors du chargement des projets. Veuillez réessayer plus tard.</div>';

    }
    
    const totalProjectsElement = document.querySelector('.total-projects');
    if (totalProjectsElement) totalProjectsElement.textContent = 'Total projets : 0';
  }}

let membersChoices;

async function loadMembers() {
  try {
    const users = await fetchMembers();

    const selectElement = document.getElementById('membersSelect');
    if (selectElement) {
      selectElement.innerHTML = '';

      users.forEach(user => {
        if (user.role === 'membre') {
          const option = document.createElement('option');
          option.value = user._id;
          option.text = `${user.nom} ${user.prenoms}`;
          selectElement.appendChild(option);
        }
      });
  
      // Détruire l'ancienne instance Choices s’il y en a une
      if (membersChoices) {
        membersChoices.destroy();
      }
  
      // Créer une nouvelle instance Choices
      membersChoices = new Choices(selectElement, {
        removeItemButton: true,
        placeholder: true,
        placeholderValue: 'Sélectionner les membres',
        searchPlaceholderValue: 'Rechercher un membre',
      });
  

    }
  } catch (err) {
    console.error('Erreur lors de la récupération des membres :', err);
  }
}



async function createProject() {
  const saveBtn = document.getElementById('saveProjectBtn');
  const closeBtn = document.getElementById('closeProjectModal');
  const cancelBtn = document.getElementById('cancelProjectBtn');
  const modal = document.getElementById('createProjectModal');
  const form = document.getElementById('createProjectForm');
  const addBtn = document.getElementById('add-project');
  const addProjectBtn = document.getElementById('add_project');
  const viewProject = document.querySelector(".btn-view")

  // Voir les détails du projet en appuyant sur "voir"
  if (viewProject) {
    viewProject.addEventListener('click', () => {
      window.location.href = '/Frontend/manager_project_id.html';
    });
  }
  // Ouvrir le modal (lié au bouton "Ajouter un projet")
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      window.location.href = '/Frontend/manager_project.html';
    });
  }

  if (addProjectBtn) {   
  addProjectBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
  }

  const closeModal = () => {
    modal.style.display = 'none';
    form.reset();
  };
  if (closeBtn && cancelBtn) {
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
  
  }


  // Création du projet
  if (saveBtn) {
    saveBtn.addEventListener('click', async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
  
      const titre = document.getElementById('projectTitle').value.trim();
      const description = document.getElementById('projectDescription').value.trim();
      const dateDebut = document.getElementById('projectStartDate').value;
      const dateFin = document.getElementById('projectEndDate').value;
      const responsable = document.getElementById('projectResponsible').value;
  
      const membersSelect = document.getElementById('membersSelect');
      const membres = Array.from(membersSelect.selectedOptions).map(opt => opt.value);
  
      // Vérification des champs requis
      if (!titre || !description || !dateDebut || !dateFin || !responsable || membres.length === 0) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
  
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/projet`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titre,
            description,
            dateDebut,
            dateFin,
            responsable_id: responsable,
            membres
          })
        });
  
        if (!response.ok) {
          console.log('Réponse serveur :', response);
          alert(response.message || 'Erreur lors de la création du projet.');
          return;
        }
        alert('✅ Projet créé avec succès !');
        closeModal();
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
        alert('❌ Une erreur est survenue lors de la création du projet.');
      }
    });
  }

}

// fonction pour afficher les éléments primaires de la page
function viewPage() {
  // Animation du bouton "Créer une tâche"
  const createTaskBtn = document.getElementById('create-task-btn');
  if (createTaskBtn) {
    createTaskBtn.addEventListener('mouseover', function () {
      this.style.transition = 'all 0.3s ease';
    });
  }

  // Animation des membres de l'équipe
  const memberChips = document.querySelectorAll('.member-chip');
  if (memberChips.length > 0) {
    memberChips.forEach(chip => {
      chip.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
      });
      chip.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
      });
    });
  }

  // Filtrage des projets
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card:not(.add-project)');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-status') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Recherche de projets
  const searchInput = document.getElementById('search-projects');
  if (searchInput && projectCards.length > 0) {
    searchInput.addEventListener('input', function () {
      const searchValue = this.value.toLowerCase();

      projectCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('.card-description')?.textContent?.toLowerCase() || '';

        if (title.includes(searchValue) || description.includes(searchValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Animation des boutons d'action
  const actionButtons = document.querySelectorAll('.card-actions button');
  if (actionButtons.length > 0) {
    actionButtons.forEach(button => {
      button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
      });
      button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Effets de confirmation pour le bouton supprimer
  const deleteButtons = document.querySelectorAll('.btn-delete');
  if (deleteButtons.length > 0) {
    deleteButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
          const card = this.closest('.project-card');
          if (card) {
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  }
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
  viewPage();
  fetchResponsableInfo()
  loadMembers()
  renderTasks();
  renderProjects();
  createProject();


});

