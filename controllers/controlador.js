const axios = require('axios');
const { getSpotifyToken } = require('../models/ServerSuarez');

// Función para obtener la información de un artista por su nombre
const getArtistInfo = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const artistName = req.params.name;

    const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
    const artistResponse = await axios.get(searchUrl, { headers: { Authorization: `Bearer ${token}` } });

    if (artistResponse.data.artists.items.length === 0) {
      return res.status(404).json({ status: 'error', msg: 'Artista no encontrado' });
    }

    const artist = artistResponse.data.artists.items[0];

    const topTracksUrl = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`;
    const topTracksResponse = await axios.get(topTracksUrl, { headers: { Authorization: `Bearer ${token}` } });

    const topTracks = topTracksResponse.data.tracks.map(track => ({
      name: track.name,
      album: track.album.name,
      release_date: track.album.release_date,
      popularity: track.popularity,
    }));

    const artistInfo = {
      name: artist.name,
      genres: artist.genres,
      followers: artist.followers.total,
      popularity: artist.popularity,
      images: artist.images,
    };

    res.json({ status: 'ok', artist: artistInfo, topTracks });
  } catch (error) {
    console.error('Error al obtener información del artista:', error.message);
    return res.status(500).json({ status: 'error', msg: 'Error inesperado al obtener la información del artista' });
  }
};

// Función para obtener información de una canción
const getTrackInfo = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const trackName = req.params.name;

    const searchUrl = `https://api.spotify.com/v1/search?q=${trackName}&type=track`;
    const trackResponse = await axios.get(searchUrl, { headers: { Authorization: `Bearer ${token}` } });

    if (trackResponse.data.tracks.items.length === 0) {
      return res.status(404).json({ status: 'error', msg: 'Canción no encontrada' });
    }

    const tracks = trackResponse.data.tracks.items.map(track => ({
      name: track.name,
      album: track.album.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      release_date: track.album.release_date,
    }));

    const recommendationsUrl = `https://api.spotify.com/v1/recommendations?seed_tracks=${trackResponse.data.tracks.items[0].id}`;
    const recommendationsResponse = await axios.get(recommendationsUrl, { headers: { Authorization: `Bearer ${token}` } });

    const recommendations = recommendationsResponse.data.tracks.map(track => ({
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      release_date: track.album.release_date,
    }));

    res.json({ status: 'ok', tracks, recommendations });
  } catch (error) {
    console.error('Error al obtener información de la canción:', error.message);
    return res.status(500).json({ status: 'error', msg: 'Error inesperado al obtener la información de la canción' });
  }
};

module.exports = { getArtistInfo, getTrackInfo };
