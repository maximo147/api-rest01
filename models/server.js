const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/users'
        //Conectar db
        this.connectDB()

        //Middleware
        this.middlewares()
        //Rutas
        this.routers()
    }

    async connectDB(){
        await dbConnection()
    }
    
    middlewares() {
        //Cors
        this.app.use(cors())
        //Lectura y parse  de JSON
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routers() {
        this.app.use(this.usuariosPath, require('../routes/user.router'))
    }

    listen() {
        this.app.listen(this.port, () => console.log('Puerto', this.port))
    }

}

module.exports = Server