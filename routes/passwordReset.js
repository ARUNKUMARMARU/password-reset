const express = require('express');
const passwordResetRouter = express.Router()
const passwordResetController = require('../controller/passwordReset')

passwordResetRouter.post('/reset',(req,res,next)=>{
    console.log(req.method,req.url);
    next()
},passwordResetController)
// passwordResetRouter.post("/:userId/:token",passwordResetController.token)

module.exports=passwordResetRouter;