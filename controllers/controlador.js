const axios = require('axios');
const Server = require('../models/server');

// Función para obtener lanzamientos recientes sin parámetros
const getNewReleases = async (req, res) => {
  try {
    const token = await Server.getSpotifyToken(); // Llamada al método estático

    const limit = req.query.limit || 50;
    const searchUrl = `https://api.spotify.com/v1/browse/new-releases?country=AR&limit=${limit}`;

    const response = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const releases = response.data.albums.items.map(album => ({
      name: album.name,
      artist: album.artists.map(artist => artist.name).join(', '),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images[0]?.url,
    }));

    res.json({ status: 'ok', releases });
  } catch (error) {
    console.error('Error al obtener lanzamientos recientes:', error.message);
    return res.status(500).json({ status: 'error', msg: 'Error inesperado al obtener lanzamientos recientes' });
  }
};

module.exports = { getNewReleases };

