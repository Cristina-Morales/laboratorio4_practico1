const axios = require('axios');
const Server = require('../models/server');

<<<<<<< HEAD
// Variable global para almacenar los lanzamientos recientes
let releasesCache = [];

// Controlador para obtener lanzamientos recientes
const getNewReleases = async (req, res) => {
  try {
    const token = await Server.getSpotifyToken();
    const limit = req.query.limit || 50;
    const searchUrl = `https://api.spotify.com/v1/browse/new-releases?country=AR&limit=${limit}`;

    const response = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Generamos los lanzamientos con un id único
    releasesCache = response.data.albums.items.map((album, index) => ({
      id: index + 1,
=======
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
>>>>>>> 29607eaba59ff7ff953c81d5a5f8a4df438dd848
      name: album.name,
      artist: album.artists.map(artist => artist.name).join(', '),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images[0]?.url,
    }));

<<<<<<< HEAD
    res.json({ status: 'ok', releases: releasesCache });
=======
    res.json({ status: 'ok', releases });
>>>>>>> 29607eaba59ff7ff953c81d5a5f8a4df438dd848
  } catch (error) {
    console.error('Error al obtener lanzamientos recientes:', error.message);
    return res.status(500).json({ status: 'error', msg: 'Error inesperado al obtener lanzamientos recientes' });
  }
};

<<<<<<< HEAD
// Controlador para obtener un lanzamiento por id
const getReleaseById = (req, res) => {
  const { id } = req.params;

  // Obtiene el lanzamiento directamente según el ID
  const release = releasesCache[parseInt(id, 10) - 1]; 

  if (release) {
    res.json({ status: 'ok', release });
  } else {
    res.status(404).json({ status: 'error', msg: 'Lanzamiento no encontrado' });
  }
};

module.exports = { getNewReleases, getReleaseById };
=======
module.exports = { getNewReleases };

>>>>>>> 29607eaba59ff7ff953c81d5a5f8a4df438dd848
