'use strict'

const favoritesController = require('./favorite.controller');
const express = require('express');
const api = express.Router();

api.post('/add', favoritesController.add);
api.delete('/delete/:id', favoritesController.delete);
api.get('/get/:id', favoritesController.get);
api.get('/getById/:id', favoritesController.getById);

module.exports = api;