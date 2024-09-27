const { Router } = require('express')
const { getAnimales, getAnimalByID } = require('../controllers/AnimalesSuarez')

const rutas = Router()

rutas.get('/animales', getAnimales)
rutas.get('/animales/:idAnimal', getAnimalByID)

module.exports = rutas
