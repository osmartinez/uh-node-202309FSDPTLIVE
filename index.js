require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const usuarioRouter = require('./routes/usuario.routes')
const productoRouter = require('./routes/producto.routes')
const pedidoRouter = require('./routes/pedido.routes')
const indexRouter = require('./routes/index.routes')
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set("secretKey", process.env.JWTSECRET)


mongoose.connect(process.env.CONNECTIONSTRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a base de datos!'))
  .catch(err=> console.log('err'));



// BUENAS PRÁCTICAS (GOOD PRACTICES)
// ARQUITECTURA LIMPIA (CLEAN ARCHITECTURE)




app.use('/', indexRouter)

// importar producto routes
app.use('/productos',productoRouter)

app.use('/pedidos', pedidoRouter)

// importar usuario routes
app.use('/usuarios',usuarioRouter)


app.listen(process.env.PORT)
