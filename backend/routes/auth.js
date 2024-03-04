const express= require('express');
const User = require('../models/User');
const router=express.Router();

router.post('/',(req,res)=>{
    res.send(req.body);
    const user=User(req.body);
    user.save();
    console.log(req.body);
})

module.exports=router