const axios = require('axios');

const getSpotifyToken = async () => {
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
};

module.exports = { getSpotifyToken };