const mongoose = require('mongoose');
const joi = require('joi')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required:true
    }
});

const User = mongoose.model('user',userSchema);

const validate = (user)=>{
    const schema = joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    return schema.validate(user);
};

module.exports= {
    User,
    validate
};