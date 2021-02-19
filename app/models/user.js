const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const parseString = require('xml2js').parseString;
const axios = require('axios');

const userSchema = new mongoose.Schema({
    local: {
        // customer: String,
        email: String,
        password: String
    },
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);