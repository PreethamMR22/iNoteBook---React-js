const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//create user using POST method: api/auth/createuser NO LOGIN REQUIRED
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 1 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "There should atleast 8 characters in password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //if there are errors , return Bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        //here you can write a logic where you can ensure that no two users can use different email id to login 
        // let finder=await User.findOne({email:req.body.email});
        // if(finder) res.status(500).json({error:"User already exists"});
        //the above logic isnt working i dont know why

   //securing pass
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt);
   

        //creating a new user
     let  user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // res.json(user);
      
      
      //returning jwt- json web token
      const data = {
        user:{
          id: user.id
        }
      }
      const JWT_SECRETE="peace bro";
      const authtoken = jwt.sign(data, JWT_SECRETE);
      
      // res.json(user)
     res.send({Token: authtoken});



    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: "Email already exists in the database" });
      }
      console.error(error);
      res.status(300).json({ error: "Server error" });
    }
  }
);





//user authentication page:/api/auth/login  -> login not required (login page keliye login thodi na karega)
router.post(('/login'),[
  body('email','Enter a valid email id').isEmail(),
  body('password','Enter a valid password of atleast 8 characters').isLength({min:7})
],async (req,res) => {
const errors=validationResult(req);
if(!errors.isEmpty()) {
 return  res.status(400).json({error:errors.array()});
}
const {email,password}= req.body;

try {
let user=await User.findOne({email});
if(!user) {
  return res.status(400).json({error:"Please try to login with appropriate credential"});
}
const passwordCompare= await bcrypt.compare(password, user.password);
//if password doesnt match
if(!passwordCompare) {
  return res.status(400).json({error:"Please try to login with appropriate credential"});
}
//if its matching do the same process to send the token
const data= {
  user:{
    id:user.id,
  }
}

const JWT_SECRETE="peace bro";
const authdata=jwt.sign(data,JWT_SECRETE);
res.send({Token:authdata});




}
catch (error) {
  if (error.code === 11000) {
    return res
      .status(400)
      .json({ error: "Email already exists in the database" });
  }
  console.error(error);
  res.status(300).json({ error: "Server error" });
}

})

module.exports = router;
