const axios = require('axios');
const { getSpotifyToken } = require('../models/server');

const getSpotifyData = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const { year, genre, artist } = req.query;

    // Verificar que al menos uno de los parámetros de búsqueda esté presente
    if (!year && !genre && !artist) {
      return res.status(400).json({
        status: 'error',
        msg: 'Debe proporcionar al menos un parámetro de búsqueda (year, genre, artist)'
      });
    }

    // Formar la consulta de búsqueda dinámicamente
    let query = '';
    if (year) query += `year:${year} `;
    if (genre) query += `genre:${genre} `;
    if (artist) query += `artist:${artist}`;

    // Búsqueda en la API de Spotify
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: query.trim(),
        type: 'album,artist',
        limit: 10 // Puedes ajustar este límite según lo que necesites
      }
    });

    // Procesar los resultados y mapear la información que deseas mostrar
    const albums = response.data.albums ? response.data.albums.items : [];
    const artists = response.data.artists ? response.data.artists.items : [];

    const data = {
      artists: artists.map(artist => ({
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        external_url: artist.external_urls.spotify
      })),
      albums: albums.map(album => ({
        name: album.name,
        artist: album.artists[0].name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        external_url: album.external_urls.spotify
      }))
    };

    // Devolver respuesta exitosa
    res.status(200).json({
      status: 'ok',
      data
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      msg: 'Error inesperado al obtener la información'
    });
  }
};

module.exports = { getSpotifyData };
