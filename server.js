const express = require('express');
const mongoose = require('mongoose');
const passport =require("passport");
//const morgan = require('morgan');
let app = express();
const session = require('express-session');
const MongoStore=require('connect-mongo')(session);
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate'); 

const cookieparser = require('cookie-parser');
const flash = require('connect-flash');
let User = require('./models/user');

mongoose.connect('mongodb://localhost/akkieco',(err)=>{
    if(err) console.log(err);
    else console.log('connected to DB!!');
});
mongoose.Promise = global.Promise;
let mainRoutes = require('./routes/main');
let userRoutes = require('./routes/user');
//middleware
app.use(cookieparser());
app.use(session({
    saveUninitialised:true,
    resave:true,
    
    secret:"akshay",
    store:new MongoStore({url:'mongodb://localhost/akkieco',autoReconnect:true})
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(mainRoutes);
app.use(userRoutes);
app.use(express.static(__dirname+'/public'));
app.use(passport.initialize());
app.use(passport.session({
    resave: true, saveUninitialized: true
}));

app.listen(3000,function(err){
    if(err) throw err;
    console.log("Server is running");
});
