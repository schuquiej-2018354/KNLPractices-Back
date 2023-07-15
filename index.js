'use strict'

require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const careerController = require('./src/career/career.controller');
const userController = require('./src/user/user.controller')

mongoConfig.connect();
app.initServer();

const defaults = async () => {
    try {
        await careerController.defaults();
        await userController.defaults()
    } catch (e) {
        console.error(e);
    }
}

defaults()