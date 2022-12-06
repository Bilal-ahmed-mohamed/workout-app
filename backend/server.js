require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
 const cors = require("cors")


// express app
const server = express();
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


const PORT = process.env.PORT || 4000;

server.use(express.json()) /* it checks if the request that comes in and checks if it has any body / data that is being send to the server , it attaches it the request object */

 server.use(cors())


// middleware
server.use((req,res,next) => {
  console.log(req.path , req.method);
  next();
})


// routes
// registering all the routes in api/workouts
server.use( "/api/workouts" , workoutRoutes);
server.use("/api/user" , userRoutes)


// connect to DB

mongoose.connect(process.env.MONGO_URI)
.then(() => {

// litsenning for requetss
        server.listen(process.env.PORT , () => {
            console.log(` connected to the db & you are in port number ${PORT}`);
        })
})
.catch((error) => {
  console.log(error);
})








