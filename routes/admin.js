var express = require("express");
var router = express.Router();

var comp = require("../models/complaint.js");

router.get("/admin/home",function(req,res){
    comp.aggregate([{ $sort : { _id : -1 } }],function(err,complaints){
        if(err){
            console.log(err);
        }
        else{
            console.log(complaints);
            res.render("./admin/home",{complaints : complaints, filter : 0});
        }
    })
})
router.get("/admin/filter",function(req,res){
    res.render("./admin/search");
})
router.post("/admin/home",function(req,res){
    comp.aggregate([{ $sort : { _id : -1 } }],function(err,complaints){
        if(err){
            console.log(err);
        }
        else{
            console.log(complaints);
            res.render("./admin/home",{complaints : complaints, filter : req.body.field});
        }
    })
})
router.get("/admin/edit/:id",function(req,res){
    comp.findById(req.params.id, function(err,comp){
        if(err){
            console.log(err);
        }
        else{
            res.render("./admin/edit", {comp : comp} );
        }
    })
})

module.exports = router;