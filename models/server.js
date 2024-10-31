// server.js
const axios = require('axios');
const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.rutas();
  }

  // Método para configurar las rutas
  rutas() {
    this.app.use('/api/v1/', require('../routes/animales')); //Cristina Morales
  }

  // Método para iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }

  // Método estático para obtener el token de Spotify
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

// Exporta la clase Server completa
module.exports = Server;
