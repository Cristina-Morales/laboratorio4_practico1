require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de la API
app.use('/api/v1', routes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});