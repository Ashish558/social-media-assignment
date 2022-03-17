
var express = require('express')
var mongoose = require('mongoose')
const multer = require('multer')
var path = require('path')

var verify = require('../verifyToken')
var Post = require('../../models/post')
var User = require('../../models/user')

var router = express.Router()


//cloudinary setup
const cloudinary = require('cloudinary')

//multer setup
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).any('postImage')

const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const dataUri = file => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer)
}

const getPostProjection = (userId) => {
    const project = {
        postedBy: 1, caption: 1, image: 1, createdAt: 1, _id: 1,
        likesCount: { $size: '$likes' },
        isLiked: {
            $cond: {
                if: { $in: [userId, "$likes"] },
                then: true,
                else: false
            }
        },
    }
    return project
}

const getPostLookup = () => {
    const lookup = {
        from: "users",
        let: { post_postedBy: "$postedBy", post_id: '$_id' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and:
                            [
                                { $eq: ["$$post_postedBy", "$_id"] }
                            ]
                    }
                }
            },
            {
                $project: {
                    username: 1, image: 1,
                }
            }
        ],
        as: "posted_by"
    }
    return lookup
}

//get all posts
router.post('/', verify, async (req, res) => {
    const { postsToSkip } = req.body

    //user who requested for posts
    const userId = mongoose.Types.ObjectId(req.user._id)
    const projection = getPostProjection(userId)
    const lookup = getPostLookup()


    try {
        await Post.aggregate([
            {
                $project: projection
            },
            { $sort: { createdAt: -1 } },
            { $skip: postsToSkip },
            { $limit: 12 },
            {
                $lookup: lookup
            }
        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            return res.status(200).json(d)
        })
    } catch (err) {
        console.log(err)
    }
})


//get all posts of a specific user
router.post('/user/:id', verify, async (req, res) => {
    const { postsToSkip } = req.body

    //whose profile is being sent
    const userId = mongoose.Types.ObjectId(req.params.id)

    //one who requested
    const requestedUser = mongoose.Types.ObjectId(req.user._id)

    const projection = getPostProjection(requestedUser)
    const lookup = getPostLookup()

    try {
        await Post.aggregate([
            {
                $match: {
                    postedBy: userId
                }
            },
            {
                $project: projection
            },
            { $sort: { createdAt: -1 } },
            { $skip: postsToSkip },
            { $limit: 12 },

            {
                $lookup: lookup
            }
        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            return res.status(200).json(d)
        })
    } catch (err) {
        console.log(err)
    }
})


//get single post
router.get('/:id', verify, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const userId = mongoose.Types.ObjectId(req.user._id)
    const projection = getPostProjection(userId)
    const lookup = getPostLookup()
    try {
        await Post.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $project: {...projection, comments: 1}
            },
            { $limit: 1 },
            {
                $lookup: lookup
            },
        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            return res.status(200).json(d)
        })
    } catch (err) {
        console.log(err)
    }
})

//create post
router.post('/create', verify, async (req, res) => {
    const { caption } = req.body
    const newPost = new Post({
        postedBy: req.user._id,
        caption,
    })
    try {
        let savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        console.log(err)
    }

})

//saving post image
router.post('/:id/update/image', verify, multerUploads, async function (req, res) {
    const postId = req.params.id
  
    if (req.files[0]) {
        try {
            const file = dataUri(req.files[0]).content;

            cloudinary.v2.uploader.upload(file, {
                folder: 'social-media/posts',
            }).then((result) => {
                const image = result.url
                Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        image: image
                    },
                    { upsert: true, new: true },
                    (err, docs) => {
                        if (err) return res.status(401).json("Error occured")
                        return res.status(200).json(docs)
                    })
            }).catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }

    } else {
        console.log('no file')
    }
})

// get posts of current user for dashboard
router.post('/user', verify, async (req, res) => {
    const { postsToSkip } = req.body
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
                    caption: 1, image: 1, createdAt: 1, _id: 1,
                    likesCount: { $size: '$likes' },
                    isLiked: {
                        $cond: {
                            if: { $in: [userId, "$likes"] },
                            then: true,
                            else: false
                        }
                    },
                    commentsCount: { $size: '$comments' },
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: 0 },
            { $limit: 12 },
        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            return res.status(200).json(d)
        })
    } catch (err) {
        console.log(err)
    }
})

//edit post
router.put('/:id/edit', verify, async (req, res) => {
    const { caption } = req.body
    const postId = req.params.id

    try {
        Post.findOneAndUpdate(
            { _id: postId },
            {
                caption
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs)
            })
    } catch (err) {
        console.log(err)
    }

})


router.put('/:id/delete', verify, async (req, res) => {
    const postId = req.params.id

    try {
        Post.findOneAndDelete(
            { _id: postId },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs)
            })
    } catch (err) {
        console.log(err)
    }

})



var postLikesRoute = require('./likes')
router.use(postLikesRoute)

var postCommentsRoute = require('./comments')
router.use(postCommentsRoute)



module.exports = router