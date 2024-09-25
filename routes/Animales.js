const { Router } = require('express')
const { getAnimales, getAnimalByID } = require('../controllers/Animales')

const rutas = Router()

// obtener el listado de animales y buscar
rutas.get('/animales', getAnimales)
// obtener animal en particular
rutas.get('/animales/:idAnimal', getAnimalByID)

module.exports = rutas
