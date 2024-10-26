const express = require('express')
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.url = process.env.URL
    this.rutas()
  }

  rutas () {
    this.app.use('/api/v1/', require('../routes/Gatos')) // Cristina Morales
    // aca tambien va tu app
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Cargo bien')
    })
  }
}
module.exports = Server
