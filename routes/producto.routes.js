const express = require('express')
const router = express.Router()

const { buscarTodos, buscarPorId, crearProducto, eliminarProducto, modificarProducto } = require('../controllers/producto.controller')

const { validarCrearProducto } = require('../helpers/validadores')

router.get("/", async (req, res) => {
    try {
        const productos = await buscarTodos()
        res.json(productos)
    } catch (error) {
        // logging
        console.log(String(error))
        res.status(500).json({msg: "error interno "})
    }
   
})

//electrosa.com/login -> acceder los clientes
//electrosa.com/admin -> acceder los administradores

router.get("/:id", async (req, res) => {
    try {
        const objetoEncontrado = await buscarPorId(req.params.id)
        if (objetoEncontrado) {
            res.json(objetoEncontrado)
        }
        else {
            res.status(404).json({ msg: 'error: producto no encontado' })
        }
    } catch (error) {
        res.status(500).json({msg: 'error interno'+String(error)})
    }


})

router.post("/", async (req, res) => {
    await crearProducto(
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())


    res.json({ msg: 'producto creado correctamente' })
})

router.delete("/:id", async (req, res) => {
    const productoBorrado = await eliminarProducto(req.params.id)
    if (productoBorrado) {
        res.json({ msg: 'producto borrado!' })
    }
    else {
        res.json({ msg: 'error: producto no encontrado' })
    }
})
// google.com/oscar
// CRUD
/**
 * C: CREATE - POST
 * R: READ - GET
 * U: UPDATE - PUT/PATCH
 * D: DELETE - DELETE
 */

router.put("/:id", async (req, res) => {
    let encontrado = null
    let msg = []
    // tengo que comprobar que todos los atributos que se pueden tocar, vienen al completo
    const resultadoValidacion = validarCrearProducto(req.body)
    if (!resultadoValidacion.valido) {
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    }
    else {
        encontrado = await modificarProducto(
            req.params.id,
            req.body.nombre.trim(),
            req.body.marca.trim(),
            req.body.modelo.trim())

        res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })
    }

})

// MVC

router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    // solamente varío los atributos que yo considero que se podrían tocar
    encontrado = await modificarProducto(
        req.params.id,
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())

    res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })

})

module.exports = router