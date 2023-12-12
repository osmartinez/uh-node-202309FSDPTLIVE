const express = require('express')

const router = express.Router()

const { buscarPorId, buscarTodos, crearUsuario } = require('../controllers/usuario.controller')
const { middlewareCrearUsuario, middlwareEmailValido } = require('../middlwares/usuario.middlwares')

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

router.post("/", middlewareCrearUsuario, middlwareEmailValido, async (req, res) => {
    try {
        await crearUsuario(req.body.email.trim(), req.body.password)
        res.json({ msg: "usuario creado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error interno en el servidor" })
    }
})

module.exports = router