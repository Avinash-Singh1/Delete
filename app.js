const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');


require('dotenv').config();

const app = express();
const port= process.env.PORT || 5000;

// Parsing middleware 
// Parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));


// parse application/json
app.use(bodyParser.json());



// to deal with the static files like css javascript , images
app.use(express.static('public'));


// template engine 
// by default the following two lines uses views and layouts
app.engine('hbs', exphbs.engine( {extname: '.hbs'} ));
app.set('view engine','hbs');


// database connection pool

const pool =mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//  CONNECT TO db 


pool.getConnection((err,connection)=>{
    if(err) throw err;


      console.log('Connected as ID '+ connection.threadId);
    
});


// Routes 

const routes =require('./server/routes/user');
app.use('/', routes);


app.listen(port,()=>console.log(` Listening on Port number ${port}`))