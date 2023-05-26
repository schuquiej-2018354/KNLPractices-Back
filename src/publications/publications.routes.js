'use strict'

const publicationController = require('./publications.controller');
const express = require('express');
const api = express.Router();

api.get('/test', publicationController.test);
api.post('/add', publicationController.add);
api.put('/update/:id', publicationController.update);
api.delete('/delete/:id', publicationController.delete);

module.exports = api;