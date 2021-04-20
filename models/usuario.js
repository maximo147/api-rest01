const { Schema, model } = require('mongoose')

const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    password: { type: String, required: true },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    img: { type: String },
    rol: { type: String, required: true },
    estado: { type: Boolean, default: true },
    google:{ type: Boolean, default: false }
})

UsuarioSchema.methods.toJSON = function () {
    const { password, __v, ...user } = this.toObject()
    return user
}

module.exports = model('Usuario', UsuarioSchema)