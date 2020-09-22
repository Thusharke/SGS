var express = require("express");
var router = express.Router();

var complaint = require("../models/complaint.js");

router.get("/complaint/new",function(req,res){
    res.render("./complaints/new");
})
router.post("/complaint",function(req,res){
    console.log(req.user.username);
    complaint.create({
        author  :  req.user._id ,
        category    : {
                department   : req.body.department,
                sub_category : req.body.category
        },
        description : req.body.description
    },function(err,comp){
        if(err){
            console.log(err)
        }
        else{
            console.log("Complaint succesfully raised");
            console.log(comp);
            res.redirect("/student/home");
        }
    })
})
router.post("/complaint/edit/:id",function(req,res){
    complaint.findByIdAndUpdate(req.params.id,
        {
            feedback : req.body.feedback,
            isRectified : req.body.isRectified
        }
        ,function(err,comp){
        if(err){
            console.log(err);
        }
        else{
            console.log(comp);
            res.redirect("/admin/home");
        }
    })
})
router.get("/complaint/raise/:id",function(req,res){
    complaint.findByIdAndUpdate(req.params.id,
        {
            feedback : "Not yet resolved",
            isRectified : false
        }
        ,function(err,comp){
        if(err){
            console.log(err);
        }
        else{
            console.log(comp);
            res.redirect("/student/home");
        }
    })
})

module.exports = router;