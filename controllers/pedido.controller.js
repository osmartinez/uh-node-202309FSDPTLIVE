

const Pedido = require('../models/pedido.model')

// API REST - RESTFUL

// API GRAPHQL

async function obtenerTodos(){
    const pedidos = await Pedido.find().populate('producto', '-_id').populate('comprador','-password -__v -_id')

    return pedidos
}

async function crearPedido(usuario, producto, cantidad){
    const nuevoPedido = new Pedido({
        comprador: usuario,
        producto: producto,
        unidades: cantidad
    })

    await nuevoPedido.save()

    return nuevoPedido
}

module.exports = {
    obtenerTodos,
    crearPedido,
}