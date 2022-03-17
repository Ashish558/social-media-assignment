const crypto = require("crypto");
const express = require("express");

const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
var bcrypt = require('bcryptjs')

const router = express.Router();

require("dotenv").config()

//send reset pword link to email
router.post("/", async (req, res) => {
    try {
 
        const { username } = req.body
        if (!username) return res.status(400).json('no email or username')

        //check if user exists
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send("user with given username doesn't exist");

        //create token
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
     
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        return res.send("password reset link sent to your email account");
    } catch (error) {
        console.log(error);
        return res.send("An error occured");
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const { password } = req.body

        const userId = req.params.userId

        if (!password) return res.status(400).json('no email or username')

        const user = await User.findById(userId);
        if (!user) return res.status(400).send("user does not exists");

        const token = await Token.findOne({
            userId: userId,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Token expired");

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword;
        await user.save();
        await token.delete();

        return res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;