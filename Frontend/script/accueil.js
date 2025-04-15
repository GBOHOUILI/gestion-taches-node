       // Animations au défilement
       const header = document.getElementById('header');
       const roleCards = document.querySelectorAll('.role-card');
       
       // Animation du header au défilement
       window.addEventListener('scroll', () => {
           if (window.scrollY > 100) {
               header.classList.add('scrolled');
           } else {
               header.classList.remove('scrolled');
           }
           
           // Animation des cartes de rôles
           const triggerBottom = window.innerHeight * 0.8;
           
           roleCards.forEach(card => {
               const cardTop = card.getBoundingClientRect().top;
               
               if (cardTop < triggerBottom) {
                   card.classList.add('animate');
               }
           });
       });
       
       // Animation des formes flottantes
       const shapes = document.querySelectorAll('.shape');
       shapes.forEach(shape => {
           // Position aléatoire initiale
           const randomX = Math.random() * 100;
           const randomY = Math.random() * 100;
           shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
       });