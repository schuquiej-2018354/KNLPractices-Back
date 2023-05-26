'use strict'

const mongoose = require('mongoose');

const commentSchemma = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    time: {
        type: Date
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Comment', commentSchemma);
