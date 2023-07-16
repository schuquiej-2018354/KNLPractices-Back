'use strict'

const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Favorite', favoriteSchema);