const express = require('express')
const axios = require('axios');


class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.url = process.env.URL
    this.rutas()
  }

  rutas () {
    this.app.use('/api/v1/', require('../routes/Gatos')) // Cristina Morales
    this.app.use('/api/v1/', require('../routes/Lanzamientos')) // Ezequiel Suarez
  }
  
  listen () {
    this.app.listen(this.port, () => {
      console.log('Cargo bien')
    })
  }

  // Método estático para obtener el token de Spotify Ezequiel Suarez
  static async getSpotifyToken() {
    try {
      const response = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
        },
        data: 'grant_type=client_credentials',
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error al obtener el token de Spotify:', error.message);
      throw new Error('No se pudo obtener el token de Spotify');
    }
  }
}
module.exports = Server
