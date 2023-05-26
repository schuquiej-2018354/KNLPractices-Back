'use strict'

const mongoose = require('mongoose');

const publicationSchemma = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    empress: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    description: {
        type: String
    },
    time: {
        type: Date
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Publication', publicationSchemma);
