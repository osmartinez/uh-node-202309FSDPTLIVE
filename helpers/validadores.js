
function validarCrearProducto(body) {
    if (body.marca === undefined
        || body.marca.trim() === ""
        || body.nombre === undefined
        || body.nombre.trim() === "") {
        return {
            valido: false,
            mensaje: "falta nombre o marca"
        }
    }
    else {
        return {
            valido: true,
            mensaje: null,
        }
    }
}

function validarCrearUsuario(body) {
    if (body.email === undefined || body.email.trim() === ""
    ) {
        return {
            valido: false,
            mensaje: "falta el email"
        }
    }
    else {
        return {
            valido: true,
            mensaje: null,
        }
    }
}

module.exports = {
    validarCrearProducto,
    validarCrearUsuario,
}