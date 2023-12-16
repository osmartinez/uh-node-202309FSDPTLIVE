const express = require('express')
const router = express.Router()

router.get("/",(req,res)=>{
    res.json({msg: "1.0.2"})
})


module.exports = router