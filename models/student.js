var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var studentSchema  = new mongoose.Schema({
    username  : String,
    email     : String,
    college   : String,
    university: String,
    isStudent : {type : Boolean , default : true}
})

studentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("student",studentSchema);