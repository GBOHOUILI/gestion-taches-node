const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// app.use((err, req, res, next) => {
//   console.error(err.stack);  // Log l'erreur pour le débogage
//   res.status(500).json({ message: 'Une erreur interne est survenue.' });
//   next();
// });


// Routes
// const authRoutes = require('./routes/userRoutes');
const essaiRoutes = require('./routes/essaiRoutes');
const adminRoutes = require('./routes/adminRoute');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Default route
app.get("/", (req, res) => {
    res.send("Hello world");
});

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/responsable/projet', projectRoutes);
app.use('/api/responsable/task', taskRoutes);
app.use('/api/users', essaiRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/member', userRoutes);

// Task test route
// app.get('/api/responsable/task', (req, res) => {
//     res.send("Bienvenue sur la route des tâches");
// });



// Start server
app.listen(process.env.PORT, () => {
    console.log("The server is listening ...");
});
