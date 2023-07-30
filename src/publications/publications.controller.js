'use strict'

const Publication = require('./publications.model');
const Favorite = require('../favorite/favorite.model');
const User = require('../user/user.model');
const Career = require('../career/career.model');
const path = require('path')
const fs = require('fs')
const moment = require('moment')

exports.test = (req, res) => {
    return res.send({ message: 'Test publication running' });
}

exports.defaults = async (req, res) => {
    try {
        let admin = await User.findOne({ name: 'ADMIN' })
        let career1 = await Career.findOne({ name: 'Informática' })
        let career2 = await Career.findOne({ name: 'Mecánica Automotriz' })
        let career3 = await Career.findOne({ name: 'Electricidad Industrial' })
        let career4 = await Career.findOne({ name: 'Dibujo Técnico' })
        let career5 = await Career.findOne({ name: 'Electrónica' })
        let publication1 = {
            image: 'Nestle.jpg',
            user: admin._id,
            empress: 'Nestle',
            location: 'Zona 14 21-78',
            phone: '45698748',
            description: '',
            career: career1._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication2 = {
            image: 'Walmart.jpg',
            user: admin._id,
            empress: 'Walmart',
            location: 'Zona 17',
            phone: '74125638',
            description: '',
            career: career1._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication3 = {
            image: 'Adidas.jpg',
            user: admin._id,
            empress: 'Adidas',
            location: 'Zona 21 5-12',
            phone: '45236987',
            description: '',
            career: career1._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication4 = {
            image: 'Honda.jpeg',
            user: admin._id,
            empress: 'Honda',
            location: 'Zona 8 5-12',
            phone: '25478965',
            description: '',
            career: career2._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication5 = {
            image: 'Toyota.jpg',
            user: admin._id,
            empress: 'Toyota',
            location: 'Zona 1 5-12',
            phone: '14789625',
            description: '',
            career: career2._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication6 = {
            image: 'Mazda.jpg',
            user: admin._id,
            empress: 'Mazda',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career2._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication7 = {
            image: 'Eegsa.jpg',
            user: admin._id,
            empress: 'Eggsa',
            location: 'Zona 15 12',
            phone: '25478596',
            description: '',
            career: career3._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication8 = {
            image: 'Hp.jpg',
            user: admin._id,
            empress: 'HP',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career3._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication9 = {
            image: 'Kemik.png',
            user: admin._id,
            empress: 'Kemik',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career3._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication10 = {
            image: 'Bi.png',
            user: admin._id,
            empress: 'BI',
            location: 'Zona 15 12',
            phone: '2547896525',
            description: '',
            career: career4._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication11 = {
            image: 'Samsung.jpg',
            user: admin._id,
            empress: 'Samsung',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career4._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication12 = {
            image: 'Bantrab.png',
            user: admin._id,
            empress: 'Bantrab',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career4._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication13 = {
            image: 'Telgua.jpg',
            user: admin._id,
            empress: 'Telgua',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career5._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication14 = {
            image: 'CDAG.jpg',
            user: admin._id,
            empress: 'CDAG',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career5._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let publication15 = {
            image: 'Google.jpg',
            user: admin._id,
            empress: 'Google',
            location: 'Zona 15 12',
            phone: '325698748',
            description: '',
            career: career5._id,
            time: moment().subtract(10, 'days').calendar(),
            hour: moment().format('LTS')
        }
        let career = await Publication.findOne({
            $or: [
                { empress: publication1.empress },
                { empress: publication2.empress },
                { empress: publication3.empress },
                { empress: publication4.empress },
                { empress: publication5.empress },
                { empress: publication3.empress },
                { empress: publication6.empress },
                { empress: publication7.empress },
                { empress: publication8.empress },
                { empress: publication9.empress },
                { empress: publication10.empress },
                { empress: publication11.empress },
                { empress: publication12.empress },
                { empress: publication13.empress },
                { empress: publication14.empress },
                { empress: publication15.empress },
            ]
        });
        if (career) return
        let newPublication1 = new Publication(publication1);
        let newPublication2 = new Publication(publication2);
        let newPublication3 = new Publication(publication3);
        let newPublication4 = new Publication(publication4);
        let newPublication5 = new Publication(publication5);
        let newPublication6 = new Publication(publication6);
        let newPublication7 = new Publication(publication7);
        let newPublication8 = new Publication(publication8);
        let newPublication9 = new Publication(publication9);
        let newPublication10 = new Publication(publication10);
        let newPublication11 = new Publication(publication11);
        let newPublication12 = new Publication(publication12);
        let newPublication13 = new Publication(publication13);
        let newPublication14 = new Publication(publication14);
        let newPublication15 = new Publication(publication15);
        await Promise.all([
            newPublication1.save(),
            newPublication2.save(),
            newPublication3.save(),
            newPublication4.save(),
            newPublication5.save(),
            newPublication6.save(),
            newPublication7.save(),
            newPublication8.save(),
            newPublication9.save(),
            newPublication10.save(),
            newPublication11.save(),
            newPublication12.save(),
            newPublication13.save(),
            newPublication14.save(),
            newPublication15.save(),
        ])
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding publications' });
    }
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
        console.log(filePath);
        const fileSplit = filePath.split('\\');
        console.log(fileSplit);
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
        let publicationDeleted = await Publication.findOneAndDelete({ _id: idPublication });
        let favoriteDeleted = await Favorite.findOneAndDelete({ publication: idPublication })
        if (!publicationDeleted) return res.send({ message: 'Publication not found and not deleted' });
        if (!favoriteDeleted) return res.send({ message: 'Favorite not found and not deleted' });
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

exports.get = async (req, res) => {
    try {
        const publications = await Publication.find().populate('user').populate('career');
        return res.status(200).send({ publications });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const publications = await Publication.find({ user: id }).populate('user');
        return res.status(200).send({ publications });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getByCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const publications = await Publication.find({ career: id }).populate('user').populate('career');
        if (!publications) return res.send({ message: 'There are no publications' })
        return res.status(200).send({ publications });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getImage = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const filePath = `./upload/publication/${fileName}`
        const image = fs.existsSync(filePath)
        if (!image) return res.status(404).send({ message: 'Image not found' })
        return res.sendFile(path.resolve(filePath));
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting image' })
    }
}

exports.getUser = async (req, res) => {
    try {
        let { id } = req.params
        let user = await Publication.find({ user: id });
        return res.status(200).send({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting image' })
    }
}


