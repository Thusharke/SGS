var express = require("express");
var router = express.Router();
var passport = require("passport");

var student = require("../models/student.js");
var admin   = require("../models/admin.js");

router.get("/register",function(req,res){
    res.render("./auth/register");
})
router.post("/register",function(req,res){
    var code = req.body.adminCode;
    if( code.length > 0 && code == "CVR@123" ){
        var user = new admin({
            username : req.body.username, 
            email : req.body.email,
            college : req.body.college,
            university : req.body.university
        });
        admin.register(user,req.body.password,function(err,user){
            if(err){
                console.log(err);
                res.redirect("/register");
            }
            else{
                passport.authenticate('adminLocal')(req,res,function(){
                    res.redirect("/");
                })
            }
        })
    }
    else{
        var user = new student({
            username : req.body.username, 
            email : req.body.email,
            college : req.body.college,
            university : req.body.university
        });
        student.register(user,req.body.password,function(err,user){
            if(err){
                console.log(err)
            }
            else{
                passport.authenticate('studentLocal')(req,res,function(){
                    res.redirect("/");
                })
            }
        })
    }
})
router.get("/login",function(req,res){
    res.render("./auth/login");
})
router.post("/login",function(req,res){
    var role = "student";
    if(req.body.admin){
        console.log("Hello Admin");
        role = "admin";
    }
    else{
        console.log("Hell student");
    }
    res.redirect(307,"/login/" + role)
})
router.post("/login/student",passport.authenticate("studentLocal",{
    failureRedirect : "/login",
    successRedirect : "/student/home"
}));
router.post("/login/admin",passport.authenticate("adminLocal",{
    failureRedirect : "/login",
    successRedirect : "/"
}));
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

module.exports = router;