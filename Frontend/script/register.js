
const API_BASE_URL = 'http://localhost:8080/api';
const EMAIL_API_URL = 'http://localhost:8080/send-email'; // URL de l'API pour envoyer des emails

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const prenoms = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    // Ajout de l'utilisateur à la liste d'attente
    const response = await fetch(`${API_BASE_URL}/users/pending`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenoms, email, password, role }),
    });

    if (response.ok) {
      alert('Votre inscription a été soumise. Veuillez attendre la validation de l\'admin.');
      document.getElementById('registerForm').reset();

      // Envoi d'un email à l'admin via l'API backend
      const emailResponse = await fetch(EMAIL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'eldomoreogbohouili@gmail.com', // Email de l'admin
          subject: 'Nouvelle inscription en attente de validation',
          message: `Un nouvel utilisateur s'est inscrit : 
            Nom : ${nom}
            Prénom : ${prenoms}
            Email : ${email}
            Rôle : ${role}
            
            Veuillez valider l'inscription via le tableau de bord : admin.html`,
        }),
      });

      if (emailResponse.ok) {
        console.log('Email envoyé avec succès à l\'admin.');
      } else {
        console.error('Erreur lors de l\'envoi de l\'email à l\'admin.');
      }

      // Redirection vers la page d'accueil
      window.location.href = 'index.html';
    } else {
      const errorData = await response.json();
      alert(`Erreur lors de l'inscription : ${errorData.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
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