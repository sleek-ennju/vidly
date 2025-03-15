const express = require('express');
const router = express.Router();


// Get Vidly Homepage
router.get('/', (req,res)=>{
    res.send("Welcome to Vidly Landing page!");
})



module.exports = router;