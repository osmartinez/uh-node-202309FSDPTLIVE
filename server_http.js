const http = require('http');

const port = 3000

// req -> peticion (para leer información)
// res -> respuesta (para responder)
function answer(req,res){
    console.log(req.url)
    
    res.setHeader("Content-Type", "application/json")

    if(req.url === "/usuario"){
        res.end(JSON.stringify({nombre: 'oscar',apellidos:'martinez', dni: '123123213Z'}))
    }
    else if(req.url === "/productos"){
        res.end(JSON.stringify([
            {
                id: 1,
                nombre: 'lavadora'
            },
            {
                id: 2,
                nombre: 'batidora'
            }
        ]))
    }
    else{
        res.end(JSON.stringify({msg: "ERROR - RUTA NO ENCONTRADA"}))
    }
}

const server = http.createServer(answer)

server.listen(port, ()=>{
    console.log(`Ya está el servidor funcionando en el puerto ${port}`)
})