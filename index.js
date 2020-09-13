var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var mongoose = require("mongoose");

var student = require("./models/student.js");
var admin   = require("./models/admin.js");

var auth = require("./routes/auth.js");
var comp = require("./routes/complaint.js");
var stud = require("./routes/student.js");

var url = process.env.DATABASEURL || "mongodb://localhost/SGS";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

app.use(require("express-session")({
    secret : "Get your off this",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use("studentLocal",new LocalStrategy(student.authenticate()));
passport.use("adminLocal",new LocalStrategy(admin.authenticate()));
passport.serializeUser(function(user, done){ 
    done(null, user);
});  
passport.deserializeUser(function(user, done){
if(user!=null)
    done(null,user);
});

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(function(req,res,next){
    res.locals.currUser = req.user;
    next();
})


app.get("/",function(req,res){
    res.render("home");
})

app.use(auth);
app.use(comp);
app.use(stud);

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log("The server is running!!");
})