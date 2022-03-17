import React, { useCallback, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { withRouter } from '../utils/withRouter'
import { containerStyle } from './styles/styles'

import { getSinglePost } from '../services/posts/posts'
import { updateComments, updateSinglePost } from '../app/slices/singlePost'
import Header from '../components/singlePost/header/header'
import Image from '../components/singlePost/header/Image'
import Icons from '../components/posts/postsList/post/icons/Icons'
import Comments from '../components/singlePost/comments/comments'
import Input from '../components/singlePost/Input'
import { getPostComments } from '../services/posts/comment/comment'

function SinglePost(props) {
    const postId = props.params.id
    const dispatch = useDispatch()

    const { post } = useSelector(state => state.singlePost)
    useEffect(() => {
        getSinglePost(postId, (err, res) => {
            if (err) return console.log(err)
            dispatch(updateSinglePost(res.data[0]))
        })

    }, [])

    const fetchComments = useCallback(() => {
        getPostComments(postId, (err, res) => {
            if (err) return console.log(err)
            dispatch(updateComments(res.comments))
        })
    }, [postId])

    if (Object.keys(post).length <= 1) return <></>
    const { image, caption, posted_by, isLiked, comments } = post

    return (
        <>
            <Container maxWidth={false}
                sx={{ ...containerStyle }}>
                <Header postedBy={posted_by} />

                <Typography variant="p" component='p' mb='8px' py={image === undefined  ? '20px' : '5px'}
                    textAlign={image === undefined ? 'center' : 'none'}
                >
                    {caption}

                </Typography>

                <Image image={image} />
                <Box mb='10px' >
                    <Icons isFromSinglePost={true} isLiked={isLiked} postId={postId} />
                </Box>
                <Input postId={postId} fetchComments={fetchComments} />
                <Comments postId={postId} comments={comments} fetchComments={fetchComments} />
            </Container>
        </>
    )
}

export default withRouter(SinglePost)