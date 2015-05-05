var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true},
    mobileNumber: { type: String, required: true},
    location: String,
    role: { type: String, default: "USER" }
});

UserSchema.path('username').index({ unique:true });

module.exports = mongoose.model('User', UserSchema);
