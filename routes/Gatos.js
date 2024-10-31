const { Router } = require('express')
const { getGatitos, getGatitoByID } = require('../controllers/Gatos')

const rutas = Router()

// obtener el listado de gatitos y buscar
rutas.get('/gatitos', getGatitos)
// obtener gatito en particular
rutas.get('/gatitos/:idGatito', getGatitoByID)

module.exports = rutas
