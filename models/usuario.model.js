const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    rol:{
        type: String,
        required: true,
    }
})

const Usuarios = mongoose.model("usuarios",usuarioSchema)

module.exports = Usuarios