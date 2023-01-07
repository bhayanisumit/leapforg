const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const jwt = require('jsonwebtoken');
 
// model
 const user = require('../model/user');

// services
 
const limiter = require('../service/limiter');
const pwd = require('../service/password');

require('dotenv').config()
router.post('/register',  limiter.limiter , async(req,res,next) =>{
     // Validation data 
   const v = new Validator(req.body, {
    firstName: 'required',
    lastName : 'required',
    email : 'required',
    password : 'required'
   });

    const matched = await v.check();
    if (!matched) { 
       return res.status(400).json({ data : [v.errors] , message : 'Validation error'  })
   }
    // check user exits or not
   let userData = await user.findOne({'email' : req.body.email })
   if(userData) return res.status(400).json({ message : 'user already registerd'  }) 
   // Add new user
   const u = new user();
   u.email = req.body.email;
   u.password = await pwd.cryptPassword(req.body.password);
   u.save((err,s) =>{
    if(err) return next(new Error('Error in create User'));
    return res.status(200).json({ status : 1,  message : 'create user success'  })
   })
})   // public route
   
router.post('/authenticate', limiter.limiter , async(req,res,next) =>{
    // Validation data 
    const v = new Validator(req.body, {
        email: 'required',
        password: 'required'
      });
      const matched = await v.check();
      if (!matched) { 
          return res.status(400).json({ data : [v.errors] , message : 'Validation error'  })
      }
    // check user exits or not
    const userData = await user.findOne({'email' : req.body.email , 'status' : 'Active'})
    if(!userData) return res.status(401).json({ message : 'No user found'  }) 
    // check password corrrect or wrong
    const checkpwd = await pwd.comparePassword(req.body.password , userData.password);
    if(!checkpwd)  return res.status(401).json({ message : 'Password dose not match'  }) 
    // generate token for 24 hour
    const token = jwt.sign({ sub: userData._id }, process.env.secret ,{ expiresIn: '24h'});
    return res.status(200).json({ status : 1, token, email : userData.email,  message : 'Login success'  })
});     // public route

module.exports = router;