const express = require('express');
const cors = require('cors');
const {PORT, CLIENT_ORIGIN} = require('./config');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

// this allows us to have our environment variables in the dotenv file
require('dotenv').config();

const app = express();
const port = process.env.PORT || PORT;


// Middlewares.
// Allow Cross Origin Requests
app.use(cors({origin: "http://localhost:3000"}));

//Body Parser Middleware for Express
app.use(express.json());

app.use(
    cookieSession({
      name: "tkct-session",
      secret: "BOOKE", // should use as secret environment variable
      httpOnly: true
    })
  );
// app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

const tutor = require('./routes/tutorRouter');
const parent = require('./routes/parentRouter');
const school = require('./routes/schoolRouter');

app.use('/tutor', tutor); 
app.use('/parent', parent);
app.use('/school', school);

const dbURI = process.env.LOCALDB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', ()=>{
    console.log("MongoDB connection established successfully.");
     //Start Server if Database connection is successful
    app.listen(port, ()=>{
     console.log(`Server started on port: ${port}`);
     });
 });
 
mongoose.connection.on('error', err =>{
    console.log("Error: ", err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log("MongoDB disconnected.");
});

process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose connection disconnected through app termination.');
        process.exit(0);
    });
});
