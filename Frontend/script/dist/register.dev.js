"use strict";

var API_BASE_URL = 'http://localhost:8080/api';
var EMAIL_API_URL = 'http://localhost:8080/send-email'; // URL de l'API pour envoyer des emails

document.getElementById('registerForm').addEventListener('submit', function _callee(e) {
  var nom, prenoms, email, password, role, response, emailResponse, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          nom = document.getElementById('nom').value;
          prenoms = document.getElementById('prenom').value;
          email = document.getElementById('email').value;
          password = document.getElementById('password').value;
          role = document.getElementById('role').value;
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/users/pending"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nom: nom,
              prenoms: prenoms,
              email: email,
              password: password,
              role: role
            })
          }));

        case 9:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 20;
            break;
          }

          alert('Votre inscription a été soumise. Veuillez attendre la validation de l\'admin.');
          document.getElementById('registerForm').reset(); // Envoi d'un email à l'admin via l'API backend

          _context.next = 15;
          return regeneratorRuntime.awrap(fetch(EMAIL_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              to: 'eldomoreogbohouili@gmail.com',
              // Email de l'admin
              subject: 'Nouvelle inscription en attente de validation',
              message: "Un nouvel utilisateur s'est inscrit : \n            Nom : ".concat(nom, "\n            Pr\xE9nom : ").concat(prenoms, "\n            Email : ").concat(email, "\n            R\xF4le : ").concat(role, "\n            \n            Veuillez valider l'inscription via le tableau de bord : admin.html")
            })
          }));

        case 15:
          emailResponse = _context.sent;

          if (emailResponse.ok) {
            console.log('Email envoyé avec succès à l\'admin.');
          } else {
            console.error('Erreur lors de l\'envoi de l\'email à l\'admin.');
          } // Redirection vers la page d'accueil


          window.location.href = 'index.html';
          _context.next = 24;
          break;

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(response.json());

        case 22:
          errorData = _context.sent;
          alert("Erreur lors de l'inscription : ".concat(errorData.message));

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](6);
          console.error('Erreur lors de l\'inscription :', _context.t0);
          alert('Une erreur est survenue. Veuillez réessayer.');

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 26]]);
}); // Fonction d'initialisation du background Three.js

function initThreeJsBackground() {
  var container = document.getElementById('canvas-container'); // Création de la scène

  var scene = new THREE.Scene(); // Configuration de la caméra

  var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5; // Configuration du renderer

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Fond transparent

  container.appendChild(renderer.domElement); // Création des particules

  var particlesGeometry = new THREE.BufferGeometry();
  var particlesCount = 1500;
  var posArray = new Float32Array(particlesCount * 3);

  for (var i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3)); // Matériau des particules

  var particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  }); // Création du mesh de particules

  var particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh); // Ajout de lumières

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0x3b82f6, 1);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight); // Variables pour l'interaction avec la souris

  var mouseX = 0;
  var mouseY = 0; // Détection des mouvements de souris

  document.addEventListener('mousemove', function (event) {
    // Calcul de la position normalisée de la souris
    mouseX = event.clientX / window.innerWidth * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }); // Fonction d'animation

  var animate = function animate() {
    requestAnimationFrame(animate); // Rotation lente des particules

    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001; // Réaction aux mouvements de la souris

    particlesMesh.rotation.y += mouseX * 0.009;
    particlesMesh.rotation.x += mouseY * 0.009; // Rendu de la scène

    renderer.render(scene, camera);
  }; // Gestion du redimensionnement de la fenêtre


  window.addEventListener('resize', function () {
    var width = container.clientWidth;
    var height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }); // Démarrage de l'animation

  animate();
}