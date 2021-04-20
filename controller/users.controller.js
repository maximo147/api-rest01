const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');


const usuariosGET = async (request, response) => {
    // const query = request.query
    const { limite = 5, desde = 0 } = request.query
    const constraint = { estado: true }

    // const usuarios = await Usuario.find(constraint)
    //     .limit( Number(limite) )
    //     .skip( Number(desde) )

    // const total = await Usuario.countDocuments(constraint)

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(constraint),
        Usuario.find(constraint)
            .limit( Number(limite) )
            .skip( Number(desde) )
    ])

    response.json({
        total, usuarios
    })
}

const usuariosPOST = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol })
    //Validar Correo
    //Encriptar contraseña
    var salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    //Guardar usuaario
    await usuario.save()
    res.json({
        usuario
    })
}

const usuariosPUT = async (request, response) => {
    const { id } = request.params;
    const { _id, password, google, correo, ...resto } = request.body
    //Validar contra base de datos
    if( password ){
        var salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    response.json({usuario})
}


const usuariosPATCH = (request, response) => {
    response.json({
        ok: 'true',
        message: 'patch API - usuariosDELETE'
    })
}

const usuariosDELETE = async (request, response) => {
    const { id } = request.params
    //Borar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id )
    //Borrar logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    response.json({
        usuario
    })
}


module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}