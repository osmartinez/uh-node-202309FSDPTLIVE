const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    marca:{
        type: String,
        required: true,
    },
    modelo:{
        type: String,
        required: false,
    }
})

const Productos = mongoose.model("productos",productoSchema)

module.exports = Productos