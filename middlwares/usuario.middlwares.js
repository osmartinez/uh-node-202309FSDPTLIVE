const { validarCrearUsuario } = require('../helpers/validadores')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { buscarPorId, buscarUnoPorMail } = require('../controllers/usuario.controller')


function middlewareCrearUsuario(req, res, next) {
    const resultadoValidacion = validarCrearUsuario(req.body)
    if (resultadoValidacion.valido) {
        next()
    }
    else {
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    }
}

function middlwareEmailValido(req,res,next){
    if(req.body.email.includes("@")){
        next()
    }
    else{
        res.status(400).json({ msg: "el formato de mail no es correcto" })
    }
}

function estaLoggeado(req,res,next){
    if(req.query.token){

        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            if(resultado.id === req.params.id){
                next()
            }
            else{
                res.status(403).json({msg: "no tienes permiso para acceder a este recurso"})
            }
           
        }catch(error){
            res.status(401).json({msg: "token no valido"})
        }
    }
    else{
        res.status(400).json({msg: "no has proporcionado token"})
    }
}

async function esAdmin(req,res,next){
    if(req.query.token){

        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            const usuarioEncontrado = await buscarPorId(resultado.id)
            if(usuarioEncontrado.rol === "admin"){
                next()
            }
            else{
                res.status(403).json({msg: "no tienes permiso para acceder a este recurso"})
            }
           
        }catch(error){
            res.status(401).json({msg: "token no valido"})
        }
    }
    else{
        res.status(400).json({msg: "no has proporcionado token"})
    }
}

async function esEmailDuplicado(req,res,next){
    const usuarioMismoMail = await buscarUnoPorMail(req.body.email)
    if(usuarioMismoMail){
        res.status(400).json({msg: "email duplicado"})
    }
    else{
        next()
    }
}



module.exports = {
    middlewareCrearUsuario,
    middlwareEmailValido,
    estaLoggeado,
    esAdmin,
    esEmailDuplicado
}