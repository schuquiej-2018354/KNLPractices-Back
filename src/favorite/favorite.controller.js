'use strict'

const Favorite = require('./favorite.model');
const Publication = require('../publications/publications.model');

exports.add = async (req, res) => {
    try {
        const data = req.body;
        const alreadyFavorite = await Favorite.findOne({ $and: [{ owner: data.owner }, { publication: data.publication }] });
        const publication = await Publication.findOne({ _id: data.publication });
        if (!publication) return res.send({ message: 'publication not found' });
        if (alreadyFavorite) return res.send({ message: 'Ya agregado a favorito' });
        const newFavorite = new Favorite(data);
        await newFavorite.save();
        return res.status(200).send({ message: 'Agregado a Favoritos' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding' })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFavorite = await Favorite.findOneAndDelete({_id: id })
        if (!deleteFavorite) return res.send({ message: 'Favorite not found and not deleted' })
        return res.status(200).send({ message: 'Removed from favorites' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleting' })
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const favorites = await Favorite.find({ owner: id }).populate('owner').populate('publication');
        return res.status(200).send({ favorites });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const favorites = await Favorite.find({ owner: id });
        return res.status(200).send({ favorites });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}