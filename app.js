const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes')
const passwordResetRouter = require('./routes/passwordReset')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/signup',userRouter)
app.use('/api/passwordreset',passwordResetRouter)


module.exports=app;