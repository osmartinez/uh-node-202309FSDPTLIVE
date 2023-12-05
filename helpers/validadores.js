
function validarCrearProducto(body){
    if (req.body.marca === undefined
        || req.body.marca.trim() === ""
        || req.body.nombre === undefined
        || req.body.nombre.trim() === "") {
        return {
            valido: false,
            mensaje: "falta nombre o marca"
        }
    }
    else{
        return {
            valido: true,
            mensaje: null,
        }
    }
}

module.exports = {
    validarCrearProducto,
}