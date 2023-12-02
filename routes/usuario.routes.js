const express = require('express')

const router = express.Router()

const Usuario = require('../models/usuario.model')

router.get("/", async (req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios)
})

router.get("/:id", async (req, res) => {
    const usuarioEncontrado = await Usuario.findById(req.params.id)
    if(usuarioEncontrado){
        res.json(usuarioEncontrado)
    }
    else{
        res.json({msg: "error: usuario no encontado"})    
    }  
})

router.post("/", async (req,res)=>{
    if( req.body.email === undefined || req.body.email.trim() === ""){
        res.json({msg: "error: email no proporcionado"})
    }
    else{
        const nuevoUsuario = new Usuario({
            email: req.body.email,
            password: req.body.password,
        })
        await nuevoUsuario.save()

        res.json({msg: "usuario creado"})
    }

})

module.exports = router