'use strict'

const Career = require('../career/career.model')

exports.test = (req, res) => {
    return res.send({ message: 'Test career running' });
}

exports.defaults = async (req, res) => {
    try {
        let carrera = {
            name: 'Default'
        }
        let carreraIn = {
            name: 'Informática'
        }
        let carreraMe = {
            name: 'Mecánica Automotriz'
        }
        let carreraElc = {
            name: 'Electricidad Industrial'
        }
        let carreraDi = {
            name: 'Dibujo Técnico'
        }
        let carreraEl = {
            name: 'Electrónica'
        }
        let career = await Career.findOne({ $or: [{ name: carrera.name }, { name: carreraIn.name }, { name: carreraMe.name }, { name: carreraElc.name }, { name: carreraDi.name }, { name: carreraEl.name }] });
        if (career) return
        let newCareer = new Career(carrera)
        let newCareerIn = new Career(carreraIn)
        let newCareerMe = new Career(carreraMe)
        let newCareerElc = new Career(carreraElc)
        let newCareerDi = new Career(carreraDi)
        let newCareerEl = new Career(carreraEl)
        await Promise.all([newCareer.save(), newCareerIn.save(), newCareerMe.save(), newCareerElc.save(), newCareerDi.save(), newCareerEl.save()])
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