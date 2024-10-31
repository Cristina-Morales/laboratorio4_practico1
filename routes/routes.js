const { Router } = require('express')
const { getNewReleases } = require('../controllers/controlador');

const rutas = Router()

// Nueva ruta para lanzamientos recientes
rutas.get('/lanzamientos', getNewReleases);


module.exports = rutas
