
const express = require("express");
const cookieParser = require('cookie-parser');

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



//server
app.listen(process.env.PORT, () => {
  console.log("The server is listening ...");
});

