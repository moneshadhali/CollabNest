const express = require("express");
const mongoose = require("mongoose");
const societiesRoute = require("./routes/societies");
const userRoute = require("./routes/user");
//const cors = require("cors");

require("dotenv").config();

//express app
const app = express();

//middleware
app.use(express.json());
//app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/societies", societiesRoute);
app.use("/api/user", userRoute);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to db: listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
