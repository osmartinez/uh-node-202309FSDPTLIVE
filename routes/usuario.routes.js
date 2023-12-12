const express = require('express')

const router = express.Router()

const { buscarPorId, buscarTodos, crearUsuario } = require('../controllers/usuario.controller')

router.get("/", async (req, res) => {
    const usuarios = await buscarTodos()
    res.json(usuarios)
})

router.get("/:id", async (req, res) => {
    const usuarioEncontrado = await buscarPorId(req.params.id)
    if (usuarioEncontrado) {
        res.json(usuarioEncontrado)
    }
    else {
        res.json({ msg: "error: usuario no encontado" })
    }
})

router.post("/", async (req, res) => {
    if (req.body.email === undefined || req.body.email.trim() === "") {
        res.json({ msg: "error: email no proporcionado" })
    }
    else {
        await crearUsuario(req.body.email.trim(), req.body.password)

        res.json({ msg: "usuario creado" })
    }

})

module.exports = router