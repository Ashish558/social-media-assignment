import React from 'react'
import { Stack } from '@mui/material'
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from 'react-router-dom';
import LikeBtn from './likeBtn';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
export default function Icons({ isLiked, postId, isFromSinglePost }) {

    return (
        <Stack direction='row' alignItems='center' spacing={1} >
            <LikeBtn isLiked={isLiked} postId={postId} />
            {isFromSinglePost ?
                <ChatBubbleOutlineOutlinedIcon sx={{ color: '#4a4a4a' }} />
                :
                <Link to={`/post/${postId}`} style={{ display: 'flex', alignItems: 'center' }} >
                    <ChatBubbleOutlineOutlinedIcon sx={{ color: '#4a4a4a' }} />
                </Link>
            }

        </Stack>
    )
}
