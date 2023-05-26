'use strict'

const mongoose = require('mongoose');

const careerSchemma = mongoose.Schema({
    name: {
        type: String
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Career', careerSchemma)