var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var compSchema = new mongoose.Schema({
    raising : {
        request  : {type : Date,default : Date.now()},
        response : {type : Date,default : Date.now()}
    },
    category    : {
            department   : String,
            sub_category : String
    },
    description : String,
    author      :{
        id : {
                type : mongoose.Schema.Types.ObjectId,
                ref  : "student"
        },
        username : String
    },
    isRectified : {type : Boolean, default : false},
    feedback    : {type : String,  default : "Not yet resolved"}
})

compSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("complaint",compSchema);
