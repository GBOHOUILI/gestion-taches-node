
const express = require("express");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/userRoutes');
 const essaiRoutes = require('./routes/essaiRoutes');
// const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env'});
require('./config/db');
const app = express();
const cors = require("cors");
const projectRoutes = require('./routes/projectRoutes');

app.use(cookieParser()); 
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=> {
    res.send("Hello world")
})

//routes
const adminRoutes = require('./routes/adminRoute');
app.use('/api/admin', adminRoutes);


app.use('/api/users', essaiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


//server
app.listen(process.env.PORT, () => {
  console.log("The server is listening ...");
});

