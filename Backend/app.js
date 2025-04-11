
const express = require("express");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/userRoutes');
 const essaiRoutes = require('./routes/essaiRoutes');
// const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env'});
require('./config/db');
const app = express();
const cors = require("cors");

app.use(cookieParser()); 
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=> {
    res.send("Hello world")
})

//routes
const adminRoutes = require('./routes/adminRoute');
app.use('/api/admin', adminRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/responsable/projet', projectRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/responsable/task', taskRoutes);
app.get('/api/responsable/task',(req,res)=> {
  res.send("bienvenue sur la route des taches")
})

app.use('/api/users', essaiRoutes);
app.use('/api/auth', authRoutes);



//server
app.listen(process.env.PORT, () => {
  console.log("The server is listening ...");
});

