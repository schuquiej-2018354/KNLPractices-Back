'use strict'

const Publication = require('./publications.model');
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const User = require('../user/user.model');

exports.test = (req, res) => {
    return res.send({ message: 'Test publication running' });
}


exports.add = async (req, res) => {
    try {
        let data = req.body;
        data.time = moment().subtract(10, 'days').calendar();
        data.hour = moment().format('LTS');

        if (!req.files || !req.files.image || !req.files.image.type) {
            return res.status(400).send({ message: 'No image file provided' });
        }

        const filePath = req.files.image.path;
        const fileSplit = filePath.split('\\');
        const fileName = fileSplit[2];
        const extension = path.extname(fileName).toLowerCase();
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

        if (!allowedExtensions.includes(extension)) {
            fs.unlinkSync(filePath);
            return res.status(400).send({ message: 'Invalid image file extension' });
        }

        data.image = fileName;

        let newPublication = new Publication(data);
        await newPublication.save();

        return res.status(200).send({ message: 'Publication created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding publication' });
    }
}

exports.defaults = async (req, res) => {
    try {
        let admin = await User.findOne({ name: 'ADMIN' })
        let publication1 = {
            image: 'apocosi2.jpg',
            user: admin._id,
            empress: 'CocaCola',
            location: 'Zona 14 21-78',
            phone: '74125638',
            description: 'XD',
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let newPublication1 = new Publication(publication1)
        await newPublication1.save();
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding publications' });
    }
}

exports.update = async (req, res) => {
    try {
        let idPublication = req.params.id;
        let data = req.body
        let updatedPublication = Publication.findOneAndUpdate(
            { _id: idPublication },
            data,
            { new: true }
        )
        if (!updatedPublication) return res.send({ message: 'Publication not found and not update' });
        return res.send({ message: 'Publication updated', idPublication })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updated publicationD' });
    }
}

exports.delete = async (req, res) => {
    try {
        let idPublication = req.params.id;
        let publicationDeleted = await User.findOneAndDelete({ _id: idPublication });
        if (!publicationDeleted) return res.send({ message: 'Publication not found and not deleted' });
        return res.send({ message: 'Publication deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleted publication' })
    }
}

exports.updloadImage = async (req, res) => {
    try {
        let publicationId = req.params.id;
        let alreadyImage = await Publication.findOne({ _id: publicationId })
        let pathFile = './upload/publication/'
        if (!req.files.image || !req.files.image.type) return res.status(400).send({ message: 'Havent sent image' })
        const filePath = req.files.image.path
        const fileSplit = filePath.split('\\')
        const fileName = fileSplit[2]
        const extension = path.extname(fileName).toLowerCase();
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        if (!allowedExtensions.includes(extension)) {
            fs.unlinkSync(filePath)
            return res.status(400).send({ message: 'Invalid extension' })
        }
        if (alreadyImage.image && extension !== path.extname(alreadyImage.image).toLowerCase()) {
            fs.unlinkSync(`${pathFile}${alreadyImage.image}`)
        }
        const updatedPublication = await Publication.findOneAndUpdate(
            { _id: publicationId },
            { image: fileName },
            { new: true }
        )
        if (!updatedPublication) return res.status(404).send({ message: 'publication not found, not updated' })
        return res.send({ message: 'Uploaded image' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error upload image' });
    }
}

exports.get = async(req, res) => {
    try{
        const publications = await Publication.find().populate('user');
        return res.status(200).send({ publications });
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getImage = async(req, res)=>{
    try{
        const fileName = req.params.fileName;
        const filePath = `./upload/publication/${fileName}`
        const image = fs.existsSync(filePath)
        if(!image) return res.status(404).send({message: 'Image not found'})
        return res.sendFile(path.resolve(filePath));
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting image'})
    }
}
