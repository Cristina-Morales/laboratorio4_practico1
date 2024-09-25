const express = require('express');
const router = express.Router();
const { getArtistInfo } = require('../controllers/controlador');
const htmlFormatter = require('../middlewares/html');

// Ruta para mostrar información del artista en HTML
router.get('/artist/:name', getArtistInfo, htmlFormatter);

module.exports = router;
