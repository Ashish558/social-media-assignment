import axios from 'axios'
import { authHeader, domain } from '../constants'

const baseUrl = `${domain}/post`

// get all posts
export const getPosts = (postsToSkip, cb) => {
    axios.post(`${baseUrl}/`, { postsToSkip }, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// get single post
export const getSinglePost = (id, cb) => {
    axios.get(`${baseUrl}/${id}`, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// for DASHBOARD - articles
export const getUserPosts = (postsToSkip, cb) => {
    axios.post(`${baseUrl}/user`, { postsToSkip }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}


// CRUD SERVICES

//create
export const createPost = (data, cb) => {
    axios.post(`${baseUrl}/create`, data, authHeader)
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}

// edit post
export const editPost = (postId, data, cb) => {
    axios.put(`${baseUrl}/${postId}/edit`, data, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

// delete post
export const deletePost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/delete`, {}, authHeader)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}


//add like
export const addLikeToPost = (postId, cb) => {
    axios.post(`${baseUrl}/${postId}/like/add`, {}, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

//remove like
export const removeLikeFromPost = (postId, cb) => {
    axios.put(`${baseUrl}/${postId}/like/remove`, {}, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}

//create step 2 - update image
export const updateImage = (postId, formData, cb) => {
    axios.post(`${baseUrl}/${postId}/update/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(res => cb(null, res))
        .catch(err => console.log(err))
}
 

// Likes
export const getPostLikes = (postId, cb) => {
    axios.get(`${baseUrl}/${postId}/likes`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}

