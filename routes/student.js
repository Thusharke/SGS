var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

var comp = require("../models/complaint.js");

router.get("/student/home",function(req,res){
    var userId  = new ObjectId(req.user._id);
    comp.find({}).populate("author").exec(function(err,complaints){
        if(err){
            console.log(err);
        }
        else{
            res.render("./student/home",{complaints : complaints, filter : 0});      
        }
    })
})
router.get("/student/filter",function(req,res){
    res.render("./student/search");
})
router.post("/student/home",function(req,res){
    var userId  = new ObjectId(req.user._id);
    comp.find({}).populate("author").exec(function(err,complaints){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.body.field);
            console.log("hello");
            res.render("./student/home",{complaints : complaints, filter : req.body.field});
        }
    })
})

module.exports = router;