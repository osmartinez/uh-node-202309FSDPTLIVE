const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pedidoSchema = new Schema({
    comprador: {
        type: mongoose.Types.ObjectId,
        ref: "usuarios",
        required: true,
    },
    lineaPedido: [{
        type: mongoose.Types.ObjectId,
        ref: "lineasPedido",
        required: true,
        }
    ]
})

const Pedido = mongoose.model("pedidos", pedidoSchema)

module.exports = Pedido