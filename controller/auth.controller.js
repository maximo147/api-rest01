
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../database/helpers/generar-jwt')
const googleVerify = require('../database/helpers/google-verify')

const getAuth = async (req, res) => {
    const { correo, password } = req.body
    try {

        //Validar si usuario está activo
        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                message: 'Correo / Password no existe - correo'
            })
        }

        //Validar usuario
        if (usuario.estado === false) {
            return res.status(400).json({
                message: 'Usuario no activo'
            })
        }
        //Validar password
        const matchPassword = bcryptjs.compareSync(password, usuario.password)
        if (!matchPassword) {
            return res.status(400).json({
                message: 'Contraseña inválida'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario._id)

        res.json({
            usuario,
            token
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Hable con el Administrador"
        })
    }
}

const googleSignIn = async (req, res) => {
    const { id_token } = req.body
    try {
        const { nombre, correo, img } = await googleVerify(id_token)
        let usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                google: true,
                img,
                rol:'USER_ROLE'
            }

            usuario = new Usuario(data)
            await usuario.save()

        }



        if (!usuario.estado) {
            res.status(401).json({
                message: 'Hable con el administrador - Usuario Bloqueado'
            })
        }

        const token = await generarJWT(usuario._id)


        res.json({
            usuario,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Token de Google no autorizado'
        })
    }

}

module.exports = {
    getAuth,
    googleSignIn
}