require('./config/config');
require('./models/db');
require('./config/passportConfig')
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const rtsIndex = require('./routes/index.router');
//CRUD
var customerController = require('./controllers/customerController')
var app = express();

// middleware
app.use(express.json()); 
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize())
app.use('/api', rtsIndex);

//CRUD
//middleware
app.use('/customer',customerController)

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));