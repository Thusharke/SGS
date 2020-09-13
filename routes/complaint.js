var express = require("express");
var router = express.Router();

var complaint = require("../models/complaint.js");

router.get("/complaint/new",function(req,res){
    res.render("./complaints/new");
})
router.post("/complaint",function(req,res){
    console.log(req.user.username);
    complaint.create({
        author  :{ id : req.user._id, username : req.user.username },
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

module.exports = router;