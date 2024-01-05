const {User, validate} = require('../model/userModel')
const bcrypt = require('bcrypt');

const userController = async(req,res) =>{
   try{
    const {error} =  validate(req.body)

    if(error) {
        res.status(400).send(error.details[0].message)
    }  

    const {name,email,password} = req.body;


    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({error : "This mail id was alredy exist"});
    }


    // const passwordHash = await bcrypt.hash(password,10);

    const newUser =  new User({name,email,password});
    const saveduser = await newUser.save();
    
    res.json({message:"user created", user:saveduser});

   }catch(error){
    res.status(500).json({error:error.message})
   }
};

module.exports = userController;