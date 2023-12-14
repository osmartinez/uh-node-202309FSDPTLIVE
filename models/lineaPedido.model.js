const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lineaPedidoSchema = new Schema({
    producto:{
        type: mongoose.Types.ObjectId,
        ref: "productos",
        required: true,
    },
    unidades:{
        type: Number,
        required: true,
    }
})

const LineaPedido = mongoose.model("lineasPedido",lineaPedidoSchema)

module.exports = LineaPedido