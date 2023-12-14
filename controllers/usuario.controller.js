
const Usuario = require('../models/usuario.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function buscarTodos(){
    const usuarios = await Usuario.find()
    return usuarios
}

async function buscarTodosPorMail(mail){
    const usuarios = await Usuario.find({email: mail})
    return usuarios
}

async function buscarPorId(id){
    const usuarioEncontrado = await Usuario.findById(id)
    return usuarioEncontrado
}

async function crearUsuario(email,pwd){
    const nuevoUsuario = new Usuario({
        email: email,
        password: pwd
    })

    await nuevoUsuario.save()

    return nuevoUsuario
}

async function login(mail, pwd){
    const usuarioEncontrado = await Usuario.findOne({email: mail})

    if(usuarioEncontrado){
        if(usuarioEncontrado.password === pwd){

            const token = jwt.sign({ id: usuarioEncontrado._id, name: usuarioEncontrado.email },process.env.JWTSECRET,{expiresIn: '1h'})
            return{
                usuario: usuarioEncontrado,
                token: token,
                msg: null,
            }
        }
        else{
            return {
                usuario: null,
                token: null,
                msg: 'password incorrecto'
            }
        }
    }
    else{
        return {
            usuario: null,
            token: null,
            msg: 'email no encontrado'
        }
    }
}

module.exports = {
    buscarTodos,
    buscarPorId,
    crearUsuario,
    login,
    buscarTodosPorMail,
}

