'use strict'

const QuestionResponse = require('./questionResponse.model');
const moment = require('moment');

exports.add = async(req, res) => {
    try{
        let data = req.body
        data.time = moment().subtract(10, 'days').calendar();
        const newResponse = new QuestionResponse(data);
        await newResponse.save();
        return res.status(200).send({message: 'response adding'})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error adding'})
    }
}

exports.getByQuestion = async(req, res) => {
    try{
        const { id } = req.params;
        const responses = await QuestionResponse.find({question: id}).populate('user');
        return res.status(200).send({ responses });
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let  responseDeleted = await QuestionResponse.findOneAndDelete({ _id: id });
        if (!responseDeleted) return res.send({ message: 'Comment not found and not deleted' });
        return res.status(200).send({ message: 'Comment deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleted comment' });
    }
}