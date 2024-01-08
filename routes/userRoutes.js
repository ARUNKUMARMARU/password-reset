const express = require('express');
const userRouter = express.Router()
const userController = require('../controller/userController');

userRouter.post('/signup', userController)


module.exports=userRouter;
