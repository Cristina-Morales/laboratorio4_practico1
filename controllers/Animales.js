const axios = require('axios')
const { request, response } = require('express')

const getAnimales = (req = request, res = response) => {
  const { search = '' } = req.query
  console.log(search)

  const filtro = (search) ? `?search=${search}` : ''
  console.log(filtro)

  axios.get(`${process.env.URL}animals${filtro}`)
    .then((response) => {
      const { data, status = [] } = response
      // handle success
      // console.log(data);

      res.status(status).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      const status = error.response.status

      if (status >= 400 && status < 500) { res.status(400).json(prepararError('error', 'Bad Request')) } else { res.status(500).json(prepararError('error', 'Error inesperado al obtener la informacion')) }
    })
}
const getAnimalByID = (req = request, res = response) => {
  const { idAnimal } = req.params
  console.log(idAnimal)

  axios.get(`${process.env.URL}animals/${idAnimal}`).then((response) => {
    const { data, status } = response

    res.status(status).json({
      msg: 'Ok',
      data
    })
  })
    .catch((error) => {
      const status = error.response.status

      if (status >= 400 && status < 500) { res.status(400).json(prepararError('error', 'Bad Request')) } else { res.status(500).json(prepararError('error', 'Error inesperado al obtener la informacion')) }
    })
}

function prepararError (status, mensajeError) {
  const response = {
    status,
    mensaje: mensajeError
  }
  return response
}

module.exports = {
  getAnimales, getAnimalByID
}
