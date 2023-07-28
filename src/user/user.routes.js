'use strict'

const userController = require('./user.controller');
const express = require('express');
const api = express.Router();
const upload = require('../multer/multer')

api.get('/test', userController.test);
api.get('/get-image/:fileName', userController.getImage);

api.get('/getById/:id', userController.getById);

api.post('/add', userController.add);
api.post('/login', userController.login);

api.put('/update/:id', userController.update);
api.put('/update-image/:id', upload.single('image'), userController.updateImage);

api.delete('/delete/:id', userController.delete);
module.exports = api;