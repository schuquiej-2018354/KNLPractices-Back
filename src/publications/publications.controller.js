'use strict'

const Publication = require('./publications.model');

exports.test = (req, res) => {
    return res.send({ message: 'Test publication running' });
}

exports.add = async (req, res) => {
    try {
        let data = req.body;
        let newPublication = new Publication(data);
        await newPublication.save();
        return res.status(200).send({ message: 'Publication created' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error add publicationD' });
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