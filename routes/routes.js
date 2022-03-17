

var express = require('express')
var router = express.Router()


//cloudinary setup 
const { config } = require('cloudinary')

const cloudinaryConfig = (req, res, next) => {
   config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
   });
   next();
}

router.use('*', cloudinaryConfig)

var authRoute = require('./user/auth')
router.use(authRoute)

var userRoute = require('./user/user')
router.use(userRoute)

var passwordResetRoute = require('./password-reset')
router.use('/password-reset', passwordResetRoute)

var postsRoute = require('./post/post')
router.use('/post', postsRoute)


module.exports = router