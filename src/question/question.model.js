'use strict'

const mongoose = require('mongoose');

const questionSchemma = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    time: {
        type: String
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Question', questionSchemma);
