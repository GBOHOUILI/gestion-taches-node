// Animation du formulaire à l'entrée
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du background Three.js
    initThreeJsBackground();
    
    // Animation d'apparition du formulaire
    setTimeout(() => {
      document.getElementById('formContainer').classList.add('active');
    }, 200);
    
    // Animation des champs de saisie
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('scale-105');
        this.classList.add('shadow-inner');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('scale-105');
        this.classList.remove('shadow-inner');
      });
    });
    
    // Animation de soumission du formulaire
  // Animation de soumission du formulaire
  
  const API_BASE_URL = 'http://localhost:8080/api/users'; // URL de l'API backend
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Récupération des valeurs des champs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Animation des inputs pour validation
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.disabled = true;
    input.classList.add('opacity-70');
  });

  // Animation du bouton
  const button = this.querySelector('button');
  button.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Connexion...';
  button.classList.add('bg-blue-800');

  // Préparation des données pour l'API
  const loginData = { email, password };
  console.log('Données envoyées :', JSON.stringify(loginData));

  try {
    // Appel à l'API backend pour authentification
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Erreur API :', errorDetails);
      alert(errorDetails.error || 'Échec de la connexion. Vérifiez vos identifiants.');
      throw new Error(errorDetails.error || 'Échec de la connexion.');
    }

  const {token,user:userData} = await response.json();
   localStorage.setItem('token', token); // Stockage du token
    console.log('Réponse utilisateur :', userData);

    // Vérification du statut de l'utilisateur
    if (userData.isActive === true) {
      if (userData.role === 'admin') {
        window.location.href = "admin.html";
      } else if (userData.role === 'membre') {
        window.location.href = "member.html";
      } else if (userData.role === 'responsable') {
        window.location.href = "manager.html";
      } else {
        throw new Error("Rôle inconnu");
      }
    }
    else {
      throw new Error("Votre compte est inactif. Veuillez contacter l'administrateur.");
    }
  } catch (error) {
    console.error('Erreur :', error.message);
    alert(error.message);
    button.innerHTML = 'Se connecter';
    button.classList.remove('bg-blue-800');
    inputs.forEach(input => {
      input.disabled = false;
      input.classList.remove('opacity-70');
    });
  }
});

// Fonction d'authentification simulée
// async function authenticateUser() {
//   // Remplacez cette simulation par une requête API réelle
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Exemple de réponse utilisateur
//       const user = {
//         isActive: true, // Changez à false pour tester un utilisateur inactif
//         role: 'admin' // Changez à 'user' pour tester un utilisateur normal
//       };
//       resolve(user);
//     }, 2000);
//   });
// }
  });
  
  // Fonction d'initialisation du background Three.js
  function initThreeJsBackground() {
    const container = document.getElementById('canvas-container');
    
    // Création de la scène
    const scene = new THREE.Scene();
    
    // Configuration de la caméra
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Configuration du renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Fond transparent
    container.appendChild(renderer.domElement);
    
    // Création des particules
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Matériau des particules
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    // Création du mesh de particules
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x3b82f6, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Variables pour l'interaction avec la souris
    let mouseX = 0;
    let mouseY = 0;
    
    // Détection des mouvements de souris
    document.addEventListener('mousemove', (event) => {
      // Calcul de la position normalisée de la souris
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotation lente des particules
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;
      
      // Réaction aux mouvements de la souris
      particlesMesh.rotation.y += mouseX * 0.009;
      particlesMesh.rotation.x += mouseY * 0.009;
      
      // Rendu de la scène
      renderer.render(scene, camera);
    };
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    
    // Démarrage de l'animation
    animate();
  }