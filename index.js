const express = require('express');
const mongoose = require('mongoose');
const logger = require("./middleware/logger");
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const homepage = require("./routes/home");
const customers = require("./routes/customers");
const debug = require('debug')("dbConnection");


// Express app
const app = express();

// DB matters
mongoose.connect("mongodb://localhost/vidly")
    .then(()=> debug("connected to mongodb..."))
    .catch(err => debug("error connecting to mongodb: ", err));

// Middleware
app.use(express.json()); //parse incoming json body middleware
app.use(logger); //log the method name

//Middleware/routes
app.use("/", homepage); //use the genres router for this url requests
app.use("/api/movies", movies); //use the movies router for this url requests
app.use("/api/genres", genres); //use the genres router for this url requests
app.use("/api/customers", customers); //use the customers router for this url requests

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App is currently running at port ${port}`);
});