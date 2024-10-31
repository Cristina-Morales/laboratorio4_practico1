const { Router } = require('express')
const { getAnimales, getAnimalByID } = require('../controllers/Animales')
const { getNewReleases } = require('../controllers/controlador');

const rutas = Router()

// obtener el listado de animales y buscar
rutas.get('/animales', getAnimales)
// obtener animal en particular
rutas.get('/animales/:idAnimal', getAnimalByID)

// Nueva ruta para lanzamientos recientes
rutas.get('/lanzamientos', getNewReleases);


module.exports = rutas
