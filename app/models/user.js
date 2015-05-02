var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type:String, unique:true },
    firstName: String,
    lastName: String,
    password: String,
    mobileNumber: String,
    location: String,
    role: String
});

UserSchema.path('username').index({ unique:true });

module.exports = mongoose.model('User', UserSchema);
