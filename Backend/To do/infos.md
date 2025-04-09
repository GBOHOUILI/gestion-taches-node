
---

## Dossiers

### `controllers/`
Les **contrôleurs** contiendront la logique de gestion des requêtes et des réponses. Chaque contrôleur va s'occuper d'une ressource spécifique (par exemple, les utilisateurs, les tâches, etc.).

- **Fichier(s) :**
  - `userController.js` : Gère les actions liées aux utilisateurs (création, modification, suppression, etc.).
  - `taskController.js` : Gère les actions liées aux tâches (création, mise à jour, suppression, etc.).
  - `projectController.js` : Gère les actions liées aux projets (création, gestion des équipes, etc.).

### `models/`
Les **modèles** définissent les structures des données, en particulier les schémas de la base de données. Chaque modèle correspondra à une collection dans la base de données (par exemple, `User`, `Task`, `Project`).

- **Fichier(s) :**
  - `userModel.js` : Définit le schéma de la collection des utilisateurs (nom, email, rôle, etc.).
  - `taskModel.js` : Définit le schéma des tâches (titre, description, date de création, statut, etc.).
  - `projectModel.js` : Définit le schéma des projets (nom, description, liste des membres, etc.).

### `routes/`
Les **routes** définissent les points d'entrée (endpoints) pour chaque ressource de l'application. Chaque route correspond à une ressource (comme les utilisateurs ou les tâches) et à son action (GET, POST, PUT, DELETE).

- **Fichier(s) :**
  - `userRoutes.js` : Déclare les routes pour la gestion des utilisateurs.
  - `taskRoutes.js` : Déclare les routes pour la gestion des tâches.
  - `projectRoutes.js` : Déclare les routes pour la gestion des projets.

### `middlewares/`
Les **middlewares** sont des fonctions qui sont exécutées pendant le cycle de vie de la requête, avant que la requête n'atteigne le contrôleur. Ils sont utilisés pour des tâches comme la validation, l'authentification, l'autorisation, la gestion des erreurs, etc.

- **Fichier(s) :**
  - `authMiddleware.js` : Gère l'authentification des utilisateurs via JWT.
  - `roleMiddleware.js` : Gère les autorisations basées sur les rôles des utilisateurs.
  - `errorMiddleware.js` : Gère les erreurs globales (par exemple, 404, 500).

### `config/`
Le dossier **config** contient les fichiers de configuration de l'application, tels que les paramètres pour la connexion à la base de données, les clés secrètes, etc.

- **Fichier(s) :**
  - `dbConfig.js` : Contient la configuration de la connexion à MongoDB (URL, options de connexion, etc.).
  - `jwtConfig.js` : Contient la clé secrète pour signer les tokens JWT.

### `utils/`
Les **utilitaires** contiennent des fonctions réutilisables dans tout le projet, comme des fonctions de validation, de formatage de dates, etc.

- **Fichier(s) :**
  - `validate.js` : Contient des fonctions pour valider les entrées des utilisateurs (par exemple, vérification des emails, des mots de passe).
  - `dateUtils.js` : Contient des fonctions pour formater et manipuler des dates.

---

## Fichiers à la racine

### `app.js`
Le fichier principal de l'application qui configure le serveur Express, les middlewares, les routes, la connexion à la base de données, et démarre le serveur.

### `.env`
Le fichier d'environnement pour stocker des variables sensibles comme la clé JWT, l'URL de la base de données, les configurations d'API externes, etc. Ce fichier **ne doit pas être versionné** (il est ajouté à `.gitignore`).

- Exemple de contenu :
  ```env
  DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gestion-taches
  JWT_SECRET=ma_cle_secrete
