'use strict'

const mongoose = require('mongoose');

const publicationSchemma = mongoose.Schema({
    image: {
        type: String
    },
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
        type: String,
        maxLength: 13,
        minLength: 8
    },
    description: {
        type: String
    },
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career'
    },
    time: {
        type: String
    },
    hour: {
        type: String
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Publication', publicationSchemma);
