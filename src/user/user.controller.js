'use strict'

const User = require('./user.model')
const Career = require('../career/career.model');
const { encrypt } = require('../utils/validate')

exports.test = (req, res) => {
    return res.send({ message: 'Test user running' });
}

exports.defaults = async (req, res) => {
    try {
        let defaultCareer = await Career.findOne({ name: 'Default' })
        let admin = {
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
        let newUser = new User(data);
        await newUser.save();
        return res.status(200).send({ message: 'User created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding user' })
    }
}

exports.update = async (req, res) => {
    try {
        let idUser = req.params.id;
        let data = req.body;
        if (data.password != null) return res.send({ message: 'Password not update' });
        let existsUserUsername = await User.findOne({ username: data.username });
        if (existsUserUsername) return res.send({ message: 'UserName already exists' });
        let existsUserEmail = await User.findOne({ email: data.email });
        if (existsUserEmail) return res.send({ message: 'Email already exists' });
        let updatedUser = User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true }
        )
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: 'User updated', idUser })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating user' })
    }
}

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