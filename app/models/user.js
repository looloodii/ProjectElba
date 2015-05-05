var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/*var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true},
    mobileNumber: { type: String, required: true},
    location: String,
    role: { type: String, default: "USER" }
});*/

var UserSchema = new mongoose.Schema({
    local    : {
        username        : String,
        password     : String

    },
    email: String,
    firstName: String,
    lastName: String,
    mobileNumber: String,
    location: String,
    role: { type: String, default: "USER" }

});

//UserSchema.path('username').index({ unique:true });

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);