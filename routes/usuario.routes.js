const express = require('express')

const router = express.Router()

const { buscarPorId, buscarTodos, crearUsuario, login, buscarTodosPorMail } = require('../controllers/usuario.controller')
const { middlewareCrearUsuario, middlwareEmailValido, estaLoggeado, esAdmin,esEmailDuplicado } = require('../middlwares/usuario.middlwares')

router.get("/", async (req, res) => {
    try {
        let usuarios = []
        if(req.query.email){
            usuarios = await buscarTodosPorMail(req.query.email)
        }
        else{
            usuarios = await buscarTodos()
        }
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

router.post("/", middlewareCrearUsuario, middlwareEmailValido, esEmailDuplicado , async (req, res) => {
    try {
        await crearUsuario(req.body.email.trim(), req.body.password, req.body.rol)
        res.json({ msg: "usuario creado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error interno en el servidor" })
    }
})

router.post("/login", async (req,res)=>{
    try{
        const resultado = await login(req.body.email, req.body.password)
        res.json({token: resultado.token, msg: resultado.msg})
    }catch(error){
        res.status(500).json({ msg: "error interno en el servidor" })
    }
})

router.get("/zona-privada/perfil/:id", estaLoggeado , async(req,res)=>{
    const usuarioEncontrado = await buscarPorId(req.params.id)
    res.json({msg: 'bienvenido a tu perfil '+ usuarioEncontrado.email})
})


router.get("/zona-admin/home",esAdmin,async(req,res)=>{
    res.json({msg: 'hola admin!'})
})

module.exports = router