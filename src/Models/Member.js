//#region Define the libraries required for this service
const mongoose = require('mongoose');
//#endregion

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 16,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 35
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 35
    },
    birthdate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', memberSchema);