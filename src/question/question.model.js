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
    question: {
        type: String
    },
    time: {
        type: String
    },
    reports: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Question', questionSchemma);
