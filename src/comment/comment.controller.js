'use strict'

const Comment = require('./comment.model');

const moment = require('moment')

exports.test = (req, res) => {
    return res.send({ message: 'Test comment running' });
}

exports.add = async (req, res) => {
    try {
        let data = req.body;
        let newComment = new Comment(data);
        data.time = moment().subtract(10, 'days').calendar()
        await newComment.save();
        return res.status(200).send({ message: 'Comment created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error add comment' });
    }
}

exports.update = async (req, res) => {
    try {
        let idComment = req.params.id;
        let data = req.body;
        let updatedComment = Comment.findOneAndUpdate(
            { _id: idComment },
            data,
            { new: true }
        );
        if (!updatedComment) return res.send({ message: 'Comment not found and not update' });
        return res.send({ message: 'Comment updated', idComment })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updated comment' });
    }
}

exports.delete = async (req, res) => {
    try {
        let idComment = req.params.id;
        let commentDeleted = await User.findOneAndDelete({ _id: idComment });
        if (!commentDeleted) return res.send({ message: 'Comment not found and not deleted' });
        return res.send({ message: 'Comment deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleted comment' });
    }
}