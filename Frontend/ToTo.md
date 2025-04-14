# 🌐 Frontend – Gestion des Tâches d'Équipe (HTML/CSS/JS)

## 🎯 Technologies utilisées
- **HTML5** – Structure du site
- **Tailwind CSS** 
- **JavaScript Vanilla** – Interaction avec le backend (API Node.js)
- **Fetch API** – Requêtes HTTP
- **LocalStorage** – Stockage du JWT
- **Responsiveness** – Flexbox & Media Queries

---

## 🎨 Design & Charte Graphique

### 🎨 Couleurs principales :
- **Bleu foncé**#1E3A8AFF : `` – En-têtes, navbar, boutons principaux
- **Bleu clair** : `#60a5fa` – Hover et éléments actifs
- **Gris clair** : `#f3f4f6` – Fond de page
- **Blanc** : `#ffffff` – Cartes, modales
- **Rouge pâle** : `#fecaca` – Erreurs
- **Vert pâle** : `#bbf7d0` – Succès

---

## 🧭 Barre de Navigation (Navbar)

- **Position** : Fixée en haut (`position: fixed`)
- **Couleur** : Bleu foncé avec texte blanc
- **Contenu** :
  - Logo à gauche
  - Liens à droite selon le rôle :
    - **Admin** : Utilisateurs | Déconnexion
    - **Responsable** : Projets | Équipes | Déconnexion
    - **Membre** : Mes Tâches | Déconnexion

- **Mobile** :
  - Menu burger avec `toggle()` pour afficher/masquer les liens

---

## 📄 Pages principales

### 1. Page de Connexion / Inscription
- Formulaire centré
- Champs : Email / Mot de passe
- Bouton `Se connecter` / `S’inscrire`
- Affichage d’erreurs sous les champs
- Stockage du token dans `localStorage`

---

### 2. Tableau de Bord (Dashboard)
- **Cartes** : Nombre de projets, tâches à faire, tâches terminées
- **Disposition** : Grille responsive (`display: grid`)
- **Design** : Cartes blanches avec ombre (`box-shadow`)
- **Icones** : Utilisation de Heroicons ou Font Awesome

---

### 3. Page Utilisateurs (Admin uniquement)
- **Tableau HTML** :
  - Colonnes : Nom | Email | Rôle | Actions (Modifier / Supprimer)
  - Bouton `Ajouter un utilisateur`
- **Modale** (masquée par défaut) pour créer ou éditer

---

### 4. Page Projets (Responsable)
- **Cartes de projets** :
  - Nom, description, avancement (barre de progression)
  - Boutons : Voir, Modifier, Supprimer
- **Formulaire** d’ajout de projet dans une modale

---

### 5. Page Équipes (Responsable)
- **Liste des membres par projet**
- Affichage en carte avec avatar ou initiales
- Bouton `Ajouter un membre`

---

### 6. Page Tâches
- **Disposition Kanban** :
  - 3 colonnes (À faire | En cours | Terminée)
  - Cartes drag & drop (`mousedown`, `mousemove`, `mouseup`)
- **Contenu d’une carte** :
  - Titre, priorité, bouton d’état, bouton de suppression

---

### 7. Page "Mes Tâches" (Membre)
- **Liste filtrable** de tâches assignées
- Filtres dynamiques par statut, date, priorité
- Bouton pour modifier le statut d’une tâche

---

## 📑 Composants HTML à prévoir

| Élément HTML         | Rôle                                             |
|----------------------|--------------------------------------------------|
| `<header>`           | Navbar fixée avec rôle dynamique                 |
| `<main>`             | Contenu de chaque page                           |
| `<section>`          | Bloc pour dashboard, projets, tâches, etc.       |
| `<form>`             | Connexion, ajout de projets, etc.                |
| `<table>`            | Gestion utilisateurs                             |
| `<div class="modal">`| Fenêtre modale pour édition / ajout              |

---

## ✅ Expérience Utilisateur (UX)
- Transitions en CSS (`transition: all 0.3s`)
- Feedback visuel : couleurs, messages de confirma tion/erreur
- Scroll doux vers le haut (`window.scrollTo`)
- Accessibilité : navigation clavier + couleurs contrastées

---

## 📱 Responsive
- Utilisation de `@media screen` pour :
  - Masquer la navbar sur petit écran
  - Transformer les grilles en colonnes
- Menu mobile avec `onclick` pour toggle
