const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
.then(() => console.log('Connect mongodb'))
.catch((err) => {
  console.log("Failded to connect to mongodb", err);
});