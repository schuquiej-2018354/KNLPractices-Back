'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3200;

const userRoutes = require('../src/user/user.routes');
const questionRoutes = require('../src/question/question.routes');
const publicationRoutes = require('../src/publications/publications.routes');
const commentRoutes = require('../src/comment/comment.routes')
const careerRoutes = require('../src/career/career.routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/publication', publicationRoutes);
app.use('/comment', commentRoutes);
app.use('/career', careerRoutes)

exports.initServer = () => {
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}