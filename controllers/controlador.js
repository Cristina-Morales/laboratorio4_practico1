const axios = require('axios');
const qs = require('qs');

// Función para obtener el token de autenticación de Spotify
const getSpotifyAuthToken = async () => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({
    'grant_type': 'client_credentials',
  });
  const headers = {
    'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await axios.post(tokenUrl, data, { headers });
  return response.data.access_token;
};

// Función para obtener la información de un artista por su nombre
const getArtistInfo = async (req, res, next) => {
  try {
    const token = await getSpotifyAuthToken();
    const artistName = req.params.name;

    // Busca el artista en Spotify
    const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
    const artistResponse = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const artist = artistResponse.data.artists.items[0]; // Tomamos el primer resultado

    // Busca las canciones más populares del artista
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`;
    const topTracksResponse = await axios.get(topTracksUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const topTracks = topTracksResponse.data.tracks;

    // Guardamos la información en res.locals para que el middleware la use
    res.locals.data = { artist, topTracks };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Error al obtener información del artista' });
  }
};

module.exports = { getArtistInfo };