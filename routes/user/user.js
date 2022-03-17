

var express = require('express')
var mongoose = require('mongoose')

var User = require('../../models/user')
var Post = require('../../models/post')

const verify = require('../verifyToken')
var router = express.Router()

//get dashboard details
router.get('/user/details/dashboard', verify, async function (req, res) {
    const userId = mongoose.Types.ObjectId(req.user._id)

    try {
        await Post.aggregate([
            {
                $match: {
                    postedBy: userId
                }
            },
            {
                $project: {
                    _id: 1,
                    likesCount: { $size: '$likes' },
                    commentsCount: { $size: '$comments' },
                }
            },
        ]).exec(function (e, data) {
            let likes = 0
            let comments = 0

            data.forEach(item => likes += item.likesCount)
            data.forEach(item => comments += item.commentsCount)
        
            return res.status(200).json({posts: data.length,likes, comments  } )
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router