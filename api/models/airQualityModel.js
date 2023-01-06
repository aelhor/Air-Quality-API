const mongoose = require('mongoose')


const airQualityScheme = new mongoose.Schema({
    ts: {
        type: Date,
        required: true,
    },
    aqius: {
        type: Number,
        required: true,
        min: 0,
    },
    mainus: {
        type: String,
        required: true,
    },
    aqicn: {
        type: Number,
        required: true,
        min: 0,
    },
    maincn: {
        type: String,
        required: true,
    }
},{ timestamps: true })

const airQuality = mongoose.model('airQuality', airQualityScheme);
module.exports = airQuality