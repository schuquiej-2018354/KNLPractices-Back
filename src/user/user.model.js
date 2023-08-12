'use strict'

const mongoose = require('mongoose');

const userSchemma = mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career'
    },
    role: {
        type: String,
        uppercase: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchemma);
