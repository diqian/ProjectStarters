var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// take the passportLocalMongoose package, add a bunch of methods that come with the
// package to our user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);