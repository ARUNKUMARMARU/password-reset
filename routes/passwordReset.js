const express = require('express');
const passwordResetRouter = express.Router()
const passwordResetController = require('../controller/passwordReset')

passwordResetRouter.post('/reset',passwordResetController)
// passwordResetRouter.post("/:userId/:token",passwordResetController.token)

module.exports=passwordResetRouter;