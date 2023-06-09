'use strict'

const Question = require('./question.model');

exports.test = (req, res) => {
    return res.send({ message: 'Test question running' });
}

exports.view = async (req, res) => {
    try {
        let questions = await Question.find();
        return res.status(200).send({ message: 'Error view questions' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error view questions' });
    }
}

exports.add = async (req, res) => {
    try {
        let data = req.body;
        let newQuestion = new Question(data);
        await newQuestion.save();
        return res.status(200).send({ message: 'Question created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error add questions' });
    }
}

exports.update = async (req, res) => {
    try {
        let idQuestion = req.params.id;
        let data = req.body;
        let updatedQuestion = Question.findOneAndUpdate(
            { _id: idQuestion },
            data,
            { new: true }
        )
        if (!updatedQuestion) return res.send({ message: 'Question not found and not update' });
        return res.send({ message: 'Question updated', idUser })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating question' });
    }
}

exports.delete = async (req, res) => {
    try {
        let idQuestion = req.params.id;
        let questionDeleted = await User.findOneAndDelete({ _id: idQuestion });
        if (!questionDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: 'Question deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleting question' });
    }
}