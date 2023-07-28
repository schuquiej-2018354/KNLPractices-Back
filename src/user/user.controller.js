'use strict'

const User = require('./user.model')
const Career = require('../career/career.model');
const Publication = require('../publications/publications.model');
const Question = require('../question/question.model');
const { encrypt, checkPassword, checkUpdate } = require('../utils/validate');
const { createToken } = require('../utils/jwt');
const upload = require('../multer/multer');
const path = require('path');
const fs = require('fs');

exports.test = (req, res) => {
    return res.send({ message: 'Test user running' });
}

exports.defaults = async (req, res) => {
    try {
        let defaultCareer = await Career.findOne({ name: 'Default' })
        let admin = {
            image: 'Default.png',
            name: 'ADMIN',
            surname: 'ADMIN',
            email: 'ADMIN',
            username: 'ADMIN',
            password: 'ADMIN',
            phone: 'ADMIN',
            career: defaultCareer._id
        }
        admin.password = await encrypt(admin.password);
        let existAdmin = await User.findOne({ username: admin.username });
        if (existAdmin) return
        let adminDefault = new User(admin)
        await adminDefault.save()
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error create admin default' })
    }
}

exports.login = async (req, res) => {
    try {
        let data = req.body
        if (!data.email || !data.password) return res.send({ message: 'Check that all fields are complete' });
        let user = await User.findOne({ email: data.email });
        if (user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            let userLogged = {
                image: user.image,
                id: user._id,
                name: user.name,
                username: user.username,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                career: user.career,
                role: user.role
            }
            return res.send({ message: 'User logged succesfully', token, userLogged })
        }
        return res.status(404).send({ message: 'Invalid Credentials' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Invalid credentials' })
    }
}

exports.view = async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).send({ message: users });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error view users' })
    }
}

exports.add = async (req, res) => {
    try {
        let data = req.body;
        let existsUserUsername = await User.findOne({ username: data.username });
        if (existsUserUsername) return res.send({ message: 'UserName already exists' });
        let existsUserEmail = await User.findOne({ email: data.email });
        if (existsUserEmail) return res.send({ message: 'Email already exists' });
        data.password = await encrypt(data.password)
        data.role = 'USER'
        data.image = 'Default.png';
        let newUser = new User(data);
        await newUser.save();
        return res.status(200).send({ message: 'User created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding user' })
    }
}

/* exports.update = async (req, res) => {
    try {
        let idUser = req.params.id;
        let data = req.body;
        if (data.password != null) return res.send({ message: 'Password not update' });
        let existsUserUsername = await User.findOne({ username: data.username });
        if (existsUserUsername) return res.send({ message: 'UserName already exists' });
        let existsUserEmail = await User.findOne({ email: data.email });
        if (existsUserEmail) return res.send({ message: 'Email already exists' });
        let updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true, upsert: true }
        )
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: 'User updated', idUser })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating user' })
    }
} */

exports.update = async (req, res) => {
    try {
        //Obtener el Id del usuario a actualizar;
        let userId = req.params.id
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si tiene permisos
        //Validar que le llegue data a actualizar
        let update = checkUpdate(data, true)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' })
        let userUpdated = await User.findOneAndUpdate(
            { _id: userId },
            data,
            { new: true }
        )
        if (!userUpdated) return res.status(404).send({ message: 'User not found adn not updated' })
        return res.send({ message: 'User updated', userUpdated })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error not updated', err: `Username ${err.keyValue.username} is already taken` })
    }
}


exports.updateImage = async (req, res) => {
    try {
        // Guarda el nombre del archivo de la imagen subida en el objeto 'data'
        if (req.file) req.body.image = req.file.filename;
        let idUser = req.params.id;
        let data = req.body;
        let user = await User.findOne({ _id: idUser });
        if (user.image !== 'Default.png' && user.image !== data.image) {
            // Eliminar la imagen anterior
            const imagePath = path.join(__dirname, '../../uploads', user.image);
            fs.unlinkSync(imagePath);
        }
        let updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            { image: data.image }, // Actualiza solo el campo de la imagen
            { new: true }
        )
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: updatedUser })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating user image' })
    }
}

exports.getImage = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        if (!fileName) return res.status(400).send({ message: 'Nombre de archivo no proporcionado' });
        // La ruta completa de la imagen será 'uploads/' + el nombre del archivo proporcionado
        const imagePath = path.join(__dirname, '../../uploads', fileName);
        // Envía la imagen como una respuesta de tipo imagen
        res.sendFile(imagePath);
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error al obtener la imagen' });
    }
};

exports.delete = async (req, res) => {
    try {
        let idUser = req.params.id;
        let userDeleted = await User.findOneAndDelete({ _id: idUser });
        if (!userDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: 'User deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error deleting user' });
    }
}

exports.getById = async (req, res) => {
    try {
        let idUser = req.params.id;
        let existsCareer = await User.findOne({ _id: idUser }).populate('career')
        return res.send({ message: existsCareer });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error getting career' })
    }
}
