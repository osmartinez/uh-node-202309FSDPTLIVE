const express = require('express')
const router = express.Router()

router.get("/",(req,res)=>{
    res.json({msg: "Bienvenido a la API"})
})


module.exports = router