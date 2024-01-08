const mongoose = require('mongoose');
const config  = require('./util/config');
const app = require('./app');

app.get('/', (req, res) => {
    res.send('Welcome to the App')
  })

app.listen(config.PORT, ()=>{


    console.log(`Running server port is ${config.PORT}`);
    mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log("Connected to mongodb...");

})
    
.catch((error)=>{
    console.log("Error while connecting to MONGODB", error.message);
});
});


    




