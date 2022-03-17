import axios from 'axios'
import { authHeader, domain } from './constants'


export const registerUser = (data, cb) => {
    axios.post(`${domain}/register`, data)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const loginUser = (data, cb) => {
    axios.post(`${domain}/login`, data)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const sendResetLink = (data, cb) => {
    axios.post(`${domain}/password-reset`, data)
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

export const resetPassword = (userId, token, password, cb) => {
    axios.post(`${domain}/password-reset/${userId}/${token}`, {password})
        .then(res => cb(null, res))
        .catch(err => cb(err, null))
}

//verify auth
export const verifyAuth = (cb) => {
    axios.get(`${domain}/verify/auth`, authHeader)
        .then(res => cb(null, true))
        .catch(err => cb(err, false))
}

export const getUserDashboardDetails = (cb) => {
    axios.get(`${domain}/user/details/dashboard`, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => console.log(err))
}


// for DASHBOARD - articles
export const getUserPosts = (postsToSkip, cb) => {
    axios.post(`${domain}/post/user`, { postsToSkip }, authHeader)
        .then(res => cb(null, res.data))
        .catch(err => cb(err, null))
}


