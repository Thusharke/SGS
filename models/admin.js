var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var adminSchema  = new mongoose.Schema({
    username : String,
    email    : String,
    compalints : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "complaint" 
        }
    },
    college   : String,
    university: String,
    isAdmin : {type : Boolean , default : true}
})

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("admin",adminSchema);