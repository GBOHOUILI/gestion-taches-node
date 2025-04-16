// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ Connexion à MongoDB réussie'))
// .catch((err) => console.error('❌ Échec de la connexion à MongoDB', err));


const mongoose = require('mongoose');
require('dotenv').config(); // pas besoin de path maintenant

console.log("MONGODB_URI:", process.env.MONGODB_URI); // pour debug

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connecté !'))
.catch(err => console.error('❌ Erreur MongoDB :', err));
