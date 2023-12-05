const Producto = require('../models/producto.model')

async function buscarTodos(){
    const productos = await Producto.find()
    return productos
}

async function buscarPorId(id){
    const productoEncontrado = await Producto.findById(id)
    return productoEncontrado
}
// 
async function crearProducto(nom, mar, mod){
    const nuevoProducto = new Producto({
        nombre: nom,
        marca: mar,
        modelo: mod,
    })

    await nuevoProducto.save()

    return nuevoProducto
}

async function eliminarProducto(id){
    const productoBorrado = await Producto.findByIdAndDelete(id)
    return productoBorrado
}

async function modificarProducto(id, nom, mar, mod){
    // importante, findByIdAndUpdate me devuelve el objeto antiguo (previo a la modificación)
   const productoModificar =  await Producto.findByIdAndUpdate(id, {nombre: nom, marca: mar, modelo: mod})
   return productoModificar
}

module.exports  = {
    buscarTodos,
    buscarPorId,
    crearProducto,
    eliminarProducto,
    modificarProducto,
}