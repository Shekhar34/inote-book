const express= require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="shekhar$goodbody";

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
    const salt =await bcrypt.genSaltSync(10);
    const secPass=await bcrypt.hash(req.body.password, salt);

     user=await  User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      });

      const data={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});
//       .then(user => res.json(user)).catch(err=>console.log(err));
 })

module.exports=router