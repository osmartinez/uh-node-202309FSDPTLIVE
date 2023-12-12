const express = require('express')

const router = express.Router()

const { buscarPorId, buscarTodos, crearUsuario } = require('../controllers/usuario.controller')
const { validarCrearUsuario } = require('../helpers/validadores')

router.get("/", async (req, res) => {
    try {
        const usuarios = await buscarTodos()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ msg: "error interno en el servidor" })
    }

})

router.get("/:id", async (req, res) => {
    try {
        const usuarioEncontrado = await buscarPorId(req.params.id)
        if (usuarioEncontrado) {
            res.json(usuarioEncontrado)
        }
        else {
            res.status(404).json({ msg: "error: usuario no encontado" })
        }
    } catch (error) {
        res.status(500).json({ msg: "error interno en el servidor" })
    }

})

router.post("/", async (req, res) => {
    const resultadoValidacion = validarCrearUsuario(req.body)

    if (resultadoValidacion.valido) {
        try {
            await crearUsuario(req.body.email.trim(), req.body.password)
            res.json({ msg: "usuario creado" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "error interno en el servidor" })
        }
    }
    else {
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    }
})

module.exports = router