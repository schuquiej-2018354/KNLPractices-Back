'use strict'

const mongoose = require('mongoose');

const questionResponseSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
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

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);