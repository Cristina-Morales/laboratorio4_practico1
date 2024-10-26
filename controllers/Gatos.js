const axios = require('axios')
const { request, response } = require('express')

const getGatitos = (req = request, res = response) => {

  const { sexo, adoptado,raza,nombre} = req.query;
 const filtros = [];
 if (sexo) filtros.push(`sexo=${encodeURIComponent(sexo)}`);
 if (adoptado) filtros.push(`adoptado=${encodeURIComponent(adoptado)}`);
 if (raza) filtros.push(`raza=${encodeURIComponent(raza)}`);
 if (nombre) filtros.push(`nombre=${encodeURIComponent(nombre)}`);
 const filtro = filtros.length > 0 ? `?${filtros.join('&')}` : '';
  axios.get(`${process.env.URL}gatitos${filtro}`)
    .then((response) => {
      const { data, status = [] } = response
      res.status(status).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      const status = error.response.status
      if (status === 404) {
         res.status(404).json(prepararError('error', 'No se encontraron gatitos'));
      } else
      if (status >= 400 && status < 500) { res.status(400).json(prepararError('error', 'Bad Request')) } else { res.status(500).json(prepararError('error', 'Error inesperado al obtener la informacion')) }
    })
  }

  
const getGatitoByID = (req = request, res = response) => {
  const { idGatito } = req.params
  console.log("idGatito")
  console.log(idGatito)

  axios.get(`${process.env.URL}gatitos/${idGatito}`).then((response) => {
    const { data, status } = response

    res.status(status).json({
      msg: 'Ok',
      data
    })
  })
    .catch((error) => {
      const status = error.response.status
      if (status === 404) {
        res.status(404).json(prepararError('error', 'No se encontraron gatitos'));
     } else
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
  getGatitos, getGatitoByID
}
