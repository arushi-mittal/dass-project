const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'citizen'],
        lowercase: true,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    mobile_no: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    }
});

module.exports = User = mongoose.model('user', UserSchema);