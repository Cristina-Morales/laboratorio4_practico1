require('dotenv').config()
const Server = require('./models/server')

const servidor = new Server()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log('La API esta escuchando en el PORT ${port}')
})

servidor.listen()