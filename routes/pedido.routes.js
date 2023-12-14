const express = require('express')
const router = express.Router()

const { crearPedido, obtenerTodos } = require('../controllers/pedido.controller')

// router get para obtener todos
router.get('/', async (req, res) => {
    const pedidos = await obtenerTodos()
    res.json(pedidos)
})

// router post para crear pedido
router.post('/', async (req, res) => {
    await crearPedido(
        req.body.usuario,
        req.body.producto,
        req.body.cantidad)

    res.json({msg: "pedido creado"})

})

module.exports = router