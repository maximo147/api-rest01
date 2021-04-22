const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')


const validarJWT = async (req = request, res, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({ 
            message: 'Invalid token'
        })
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETPUBLICKEY)
        const usuario = await Usuario.findById(uid)
        if(!usuario){
            return res.status(401).json({
                message: 'Usuario no existe en la BD'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                message: 'Usuario inactivo'
            })
        }

        req.usuario = usuario
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            message: 'Token inválido'
        })
    }

}

module.exports = validarJWT