const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UploadVideo = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userEmail: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = UserVideo = mongoose.model('uploadvideo', UploadVideo);