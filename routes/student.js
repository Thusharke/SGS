var express = require("express");
var router = express.Router();

router.get("/student/home",function(req,res){
    res.render("./student/home");
})

module.exports = router;