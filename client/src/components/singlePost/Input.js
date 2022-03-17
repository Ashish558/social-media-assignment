import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import { addComment } from '../../services/posts/comment/comment';

export default function InputBar({ postId, fetchComments }) {

    const [comment, setComment] = useState('')
    const handleClick = () => {
        if (comment.trim() === '') return
        addComment(postId, comment, (err, res) => {
            if (err) return console.log(err)
            fetchComments()
            setComment('')
        })
    }

    return (
        <Box sx={styles.container} >
            <Box sx={{ display: 'flex' }} >
                <input style={styles.input} value={comment} onChange={(e) => setComment(e.target.value)} />
                <IconButton color="primary" onClick={handleClick} >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

const styles = {
    container: {
        ['@media (max-width:568px)']: { // eslint-disable-line no-useless-computed-key
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            py: '8px',
            px: '3px',
            backgroundColor: '#ededed',
            // '&:hover': {
            //     backgroundColor: '#f3f3f3',
            //     color: '#1081e8'
            // },
        },
        width: '100%',
    },
    input: {
        flex: '1',
        outline: 'none',
        padding: '10px 10px',
        border: '1px solid rgb(192 192 192)',
        borderRadius: '3px',
        marginRight: '7px'
    },
    sendBtn: {

    }
}
