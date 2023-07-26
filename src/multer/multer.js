'use strict'

const multer = require('multer');

// Configura el almacenamiento para las imágenes subidas
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define la carpeta de destino donde se guardarán las imágenes
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define el nombre de archivo para la imagen subida
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filtra los archivos para permitir solo imágenes (puedes modificar esto para permitir otros tipos de archivo)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('¡Solo se permiten imágenes!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;