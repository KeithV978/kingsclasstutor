const express = require('express');
const cors = require('cors');
const {PORT, CLIENT_ORIGIN} = require('./config');
const mongoose = require('mongoose');

// this allows us to have our environment variables in the dotenv file
require('dotenv').config();

const app = express();
const port = process.env.PORT || PORT;


// Middlewares.
// Allow Cross Origin Requests
app.use(cors());

// app.use(cors());
app.use(express.json());
// app.use(express.static('uploads'));

const tutor = require('./routes/tutorRouter');
const parent = require('./routes/parentRouter');

app.use('/tutor', tutor); 
app.use('/parent', parent);

const dbURI = process.env.DB_URI;
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// mongoose.connection.on('connected', ()=>{
//     console.log("MongoDB database connection established successly.");
//     //Start Server if Database connection is successful
    app.listen(port, ()=>{
     console.log(`Server started on port: ${port}`);
     });
// });
 
// mongoose.connection.on('error', err =>{
//     console.log("Error: ", err);
// });

// mongoose.connection.on('disconnected', ()=>{
//     console.log("MongoDB database disconnected.");
// });

// process.on('SIGINT', ()=>{
//     mongoose.connection.close(()=>{
//         console.log('Mongoose connection disconnected through app termination.');
//         process.exit(0);
//     });
// });
