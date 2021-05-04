const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    admin_email: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    plate_no: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        default: 'record',
        enum: ['record', 'violation', 'bookmarked', 'deleted']
    }
});

module.exports = Record = mongoose.model('record', RecordSchema);