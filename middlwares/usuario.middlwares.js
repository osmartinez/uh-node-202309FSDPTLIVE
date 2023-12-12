const { validarCrearUsuario } = require('../helpers/validadores')

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



module.exports = {
    middlewareCrearUsuario,
    middlwareEmailValido,
}