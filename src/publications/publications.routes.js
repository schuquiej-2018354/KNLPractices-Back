'use strict'

const publicationController = require('./publications.controller');
const express = require('express');
const api = express.Router();
const multiparty = require('connect-multiparty')
const upload = multiparty({ uploadDir: './upload/publication' })

api.get('/test', publicationController.test);
api.post('/add', upload, publicationController.add);
api.put('/update/:id', publicationController.update);
api.delete('/delete/:id', publicationController.delete);

api.put('/uploadImage/:id', publicationController.updloadImage);
api.put('/updatePu/:id', upload, publicationController.updatePu)


api.get('/get', publicationController.get);
api.get('/getById/:id', publicationController.getById);
api.get('/get-image/:fileName', upload, publicationController.getImage)
api.get('/getByCarrer/:id', publicationController.getByCareer);
api.get('/getUser/:id', publicationController.getUser)

module.exports = api;