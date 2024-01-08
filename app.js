const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes')
const passwordResetRouter = require('./routes/passwordReset')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api',userRouter)
app.use('/api',passwordResetRouter)


module.exports=app;