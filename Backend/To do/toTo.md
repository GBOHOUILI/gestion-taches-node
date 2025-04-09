# ✅ Suivi du Projet – Backend "Gestion des Tâches d'une Équipe"

## 👨‍💻 Développeur 1 – [Eldo]
Responsable de la base du projet, Auth, rôles et gestion des utilisateurs.

### 🔧 Initialisation & Configuration
- [ ] Initialiser le projet Node.js
- [ ] Installer les dépendances de base (`express`, `mongoose`, `dotenv`, `cors`, `jsonwebtoken`, etc.)
- [ ] Configurer la connexion MongoDB
- [ ] Créer la structure de dossiers (`routes/`, `models/`, `controllers/`, etc.)
- [ ] Créer fichier `.env` avec les variables (URI MongoDB, clé JWT)

### 🔐 Authentification & Rôles
- [ ] Route POST /register
- [ ] Route POST /login (avec JWT)
- [ ] Middleware de vérification du token JWT
- [ ] Middleware de contrôle par rôle (admin, responsable, membre)

### 👥 Gestion des Utilisateurs (admin only)
- [ ] Modèle `User`
- [ ] Hash du mot de passe avec bcrypt
- [ ] Route GET /users → liste des utilisateurs
- [ ] Route POST /users → création utilisateur
- [ ] Route PUT /users/:id → mise à jour utilisateur
- [ ] Route DELETE /users/:id → suppression utilisateur
- [ ] Sécurisation des routes (admin only)

### 🧪 Tests & Documentation
- [ ] Tester toutes les routes avec Postman
- [ ] Créer documentation des endpoints (PDF ou Notion ou Swagger)
- [ ] Préparer exemples pour la présentation finale

---

## 👨‍💻 Développeur 2 – [IZI]
Responsable des projets, des équipes, des tâches et du déploiement.

### 📁 Gestion des Projets
- [ ] Modèle `Project`
- [ ] Route POST /projects → création de projet
- [ ] Route GET /projects → liste des projets d’un responsable
- [ ] Route PUT /projects/:id → modification
- [ ] Route DELETE /projects/:id → suppression

### 👨‍👩‍👧‍👦 Gestion des Équipes
- [ ] Lier utilisateurs à des projets (champ `teamMembers`)
- [ ] Route pour ajouter un membre à un projet
- [ ] Route pour retirer un membre d’un projet
- [ ] Vérifier que seul le responsable du projet peut modifier l’équipe

### ✅ Gestion des Tâches
- [ ] Modèle `Task` (titre, description, status, priorité, assignedTo, etc.)
- [ ] Route POST /tasks → création par responsable
- [ ] Route GET /tasks → liste avec filtres et pagination
- [ ] Route GET /tasks/mine → vue personnelle d’un membre
- [ ] Route PUT /tasks/:id/status → mise à jour du statut par le membre

### 🚀 Déploiement
- [ ] Créer base MongoDB Atlas
- [ ] Déployer sur Render (ou Heroku)
- [ ] Ajouter variables d’environnement
- [ ] Tester les routes déployées

---

## 🔄 Étapes communes (à faire ensemble)
- [ ] Relire et nettoyer le code final
- [ ] Tester tous les scénarios (connexion, rôles, erreurs)
- [ ] Préparer la démonstration orale (explication du code, rôles, organisation)
