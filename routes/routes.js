const express = require('express');
const { getSpotifyData } = require('../controllers/controlador');
const router = express.Router();

// Ruta principal con filtros de año, género y artista
router.get('/albums', getSpotifyData);

module.exports = router;