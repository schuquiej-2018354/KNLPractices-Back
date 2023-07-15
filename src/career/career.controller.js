'use strict'

const Career = require('../career/career.model')

exports.test = (req, res) => {
    return res.send({ message: 'Test career running' });
}

exports.defaults = async (req, res) => {
    try {
        let carrera = {
            name: 'DEFAULT'
        }
        let existAdmin = await Career.findOne({ name: carrera.name });
        if (existAdmin) return
        let careeerDefault = new Career(carrera)
        await careeerDefault.save()
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error create career default' })
    }
}

exports.add = async (req, res) => {
    try {
        let data = req.body
        let existCareer = await Career.findOne({ name: data.name })
        if (existCareer) return res.status(400).send({ message: 'Career already exists' });
        let career = new Career(data);
        await career.save()
        return res.send({ message: 'Career adding suscesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error adding new Career' })
    }
}

exports.update = async (req, res) => {
    try {
        let idCareer = req.params.id
        let data = req.body
        let updatedCareer = Career.findOneAndUpdate(
            { _id: idCareer },
            data,
            { new: true }
        )
        if (!updatedCareer) return res.send({ message: 'Career not found and not update' })
        return res.send({ message: 'Career updated' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating career' })
    }
}

exports.delete = async (req, res) => {
    try {
        let idCareer = req.params.id;
        let careerDeleted = await Career.findOneAndDelete({ _id: idCareer });
        if (!careerDeleted) return res.send({ message: 'Career not found and not deleted' })
        return res.send({ message: 'Career deleting' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error deleting career' })
    }
}