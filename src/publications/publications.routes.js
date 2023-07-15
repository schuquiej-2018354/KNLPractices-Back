'use strict'

const publicationController = require('./publications.controller');
const express = require('express');
const api = express.Router();
const multiparty = require('connect-multiparty')
const upload = multiparty({ uploadDir: './upload/publication' })

api.get('/test', publicationController.test);
api.post('/add', publicationController.add);
api.put('/update/:id', publicationController.update);
api.delete('/delete/:id', publicationController.delete);
api.put('/uploadImage/:id', upload, publicationController.updloadImage)

module.exports = api;