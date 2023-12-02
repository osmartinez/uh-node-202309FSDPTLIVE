const express = require('express')

const router = express.Router()

const Producto = require('../models/producto.model')

const productos = [{ id: 1, nombre: 'lavadora   ', marca: 'bosch', ref: '0101020023L' }]

router.get("/", async (req, res) => {
    const productos = await Producto.find()

    res.json(productos)
})

router.get("/:id", async (req, res) => {
    const objetoEncontrado = await Producto.findById(req.params.id)
    if (objetoEncontrado !== undefined) {
        res.json(objetoEncontrado)
    }
    else {
        res.json({ msg: 'error: producto no encontado' })
    }
})

router.post("/", async (req, res) => {
    // generar el objeto
    const nuevoProducto = new Producto({
        marca: req.body.marca.trim(),
        nombre: req.body.nombre.trim(),
        modelo: req.body.modelo,
    })

    // guardarlo
    await nuevoProducto.save()

    res.json({ msg: 'producto creado correctamente' })
})

router.delete("/:id", async (req, res) => {
    const productoBorrado = await Producto.findByIdAndDelete(req.params.id)
    //equivale a comparar con !== undefined && productoBorrado !== null
    if (productoBorrado) {
        res.json({ msg: 'producto borrado!' })
    }
    else {
        res.json({ msg: 'error: producto no encontrado' })
    }
})

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
    if (req.body.marca === undefined
        || req.body.marca.trim() === ""
        || req.body.nombre === undefined
        || req.body.nombre.trim() === "") {
        res.json({ msg: 'No se han proporcionado todos los valores' })
    }
    else {
        encontrado = await Producto.findByIdAndUpdate(req.params.id, req.body)

        res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })
    }

})

// MVC

router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    // solamente varío los atributos que yo considero que se podrían tocar
    encontrado = await Producto.findByIdAndUpdate(req.params.id, req.body)

    res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })

})

module.exports = router