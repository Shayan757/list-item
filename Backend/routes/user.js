const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const UserModel = require("../model/userModel");


//Register api//

router.post("/register",[

    
 
    body("name" , "Enter a valid name").isLength({min:3}),
    body("email" , "Enter a valid email").isEmail(),
    body("password" , "Enter a valid password").isLength({min:5})

], async(req,res)=>{

  let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      let user = await UserModel.findOne({email:req.body.email})

      if (user) {

        return res.status(409).json("This email is already exist");
        
      }

      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(req.body.password, salt);


      user = await UserModel.create({

        name : req.body.name,
        email : req.body.email,
        password :hashpass

      })

        const data = {
            user : {
              id:user.id
            }
          }
          
          
          const authtoken = jwt.sign(data,process.env.JWT_SECRET)
          
          success = true;
          
          res.json({success,authtoken})
          
          
              
            } catch (error) {
              
              console.error(error.message);
          
              return res.status(500).send("Internal server error");
            }
      });


      //Login//




  router.post("/login", [

    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({min:6})
], async (req, res) => {

  let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const {email,password} = req.body;

   try {

 let user = await UserModel.findOne({email})

 if (!user)
    
 return res.status(300).json({ error: "Enter with correct credentials"})

 
 const passwordcompare = await bcrypt.compare(password,user.password)

 if(!passwordcompare)

 return res.status(300).json({ error: "Enter with correct credentials"})


 const data = {
  user : {
    id:user.id
  }
}


const authtoken = jwt.sign(data,process.env.JWT_SECRET)
success = true;
res.json({success,authtoken})


   } catch (error) {
    
    console.error(error.message);

    return res.status(500).send("Internal server error");
   }


  });


  



module.exports = router