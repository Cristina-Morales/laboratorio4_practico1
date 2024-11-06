const { Router } = require('express');
const { getNewReleases, getReleaseById } = require('../controllers/controlador');

const rutas = Router();

// Ruta para lanzamientos recientes
rutas.get('/lanzamientos', getNewReleases);

// Ruta para obtener un lanzamiento específico por id
rutas.get('/lanzamientos/:id', getReleaseById);

module.exports = rutas;