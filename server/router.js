const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
res.send("sever is up");
})

module.exports = router; 