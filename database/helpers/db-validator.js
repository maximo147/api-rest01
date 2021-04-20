const Role = require('../../models/role')
const Usuario = require('../../models/usuario')

const roleValidator = async (rol) => {
    const existeRol = await Role.findOne({ rol })
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailValidator = async (correo) => {
    const existEmail = await Usuario.findOne({ correo })
    if(existEmail){
        throw new Error(`El correo ya está registrado en la BD`)
    }  
}

const idValidator = async (id) => {
    const existId = await Usuario.findById(id)
    if(!existId){
        throw new Error(`El id no está registrado en la BD`)
    }  
}


module.exports = {
    roleValidator,
    emailValidator,
    idValidator
}