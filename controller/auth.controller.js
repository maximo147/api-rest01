
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../database/helpers/generar-jwt')

const getAuth = async (req, res) => {
    const { correo, password } = req.body
    try{

        //Validar si usuario está activo
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                message: 'Correo / Password no existe - correo'
            })
        }

        //Validar usuario
        if(usuario.estado === false){
            return res.status(400).json({
                message: 'Usuario no activo'
            })
        }
        //Validar password
        const matchPassword = bcryptjs.compareSync(password, usuario.password)
        if(!matchPassword){
            return res.status(400).json({
                message: 'Contraseña inválida'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario._id )

        res.json({
            usuario, 
            token
        })            


    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Hable con el Administrador"
        })
    }
}

module.exports = {
    getAuth
}