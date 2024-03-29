const Token = require('../model/token');
const sendEmail = require('../util/sendEmail')
const crypto = require('crypto');
const Joi = require('joi');
const {User} = require('../model/userModel')


const passwordResetController ={ 
    requestlink : async(req,res)=>{
     
    try {        
        console.log(req.body)
        const schema = Joi.object({ email: Joi.string().email().required() });
        // await schema.validateAsync(req.body)
        const { error } = schema.validate(req.body);
        
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
       
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/newpassword`;
        // ${user._id}/${token.token
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
},

newpassword :async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}}



module.exports = passwordResetController;