
const Usuario = require('../models/usuario.model')

async function buscarTodos(){
    const usuarios = await Usuario.find()
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

module.exports = {
    buscarTodos,
    buscarPorId,
    crearUsuario,
}

