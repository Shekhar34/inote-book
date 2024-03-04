const express= require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createuser',[
    body('name','enter valid name').isLength({ min: 5 }),
    body('email','enter valid email').isEmail(),
    body('password','enter valid password and atleast 5 character').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error: "eamil with same eamil found"});
    }
     user=await  User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
//       .then(user => res.json(user)).catch(err=>console.log(err));
 })

module.exports=router