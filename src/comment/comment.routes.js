'use strict'

const commentController = require('./comment.controller');
const express = require('express');
const api = express.Router();

api.get('/test', commentController.test);
api.post('/add', commentController.add);
api.put('/update/:id', commentController.update);
api.delete('/delete/:id', commentController.delete);
api.get('/getComments/:id', commentController.getByPublication);

module.exports = api;