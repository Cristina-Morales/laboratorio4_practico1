const htmlFormatter = (req, res) => {
    const { artist, topTracks } = res.locals.data;
  
    // HTML básico con estilo de Spotify
    const html = `
      <html>
      <head>
        <title>${artist.name} - Información</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #1DB954;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          .artist-info {
            text-align: center;
          }
          .artist-info img {
            border-radius: 50%;
          }
          .top-tracks {
            margin-top: 20px;
          }
          .track {
            display: flex;
            justify-content: space-between;
            background-color: #333;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
          }
          .track a {
            color: #1DB954;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="artist-info">
            <img src="${artist.images[0]?.url}" alt="${artist.name}" width="200"/>
            <h1>${artist.name}</h1>
            <p>Géneros: ${artist.genres.join(', ')}</p>
            <p>Popularidad: ${artist.popularity}</p>
          </div>
          <div class="top-tracks">
            <h2>Top 10 Canciones</h2>
            ${topTracks.map(track => `
              <div class="track">
                <span>${track.name}</span>
                <a href="${track.external_urls.spotify}" target="_blank">Escuchar</a>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
  
    res.send(html);
  };
  
  module.exports = htmlFormatter;
  