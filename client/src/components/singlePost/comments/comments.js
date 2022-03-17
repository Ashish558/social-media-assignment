import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from 'react-redux'


import Comment from './comment'

export default function Comments({postId, fetchComments}) {
    const classes = useStyles();
    const { comments } = useSelector(state => state.singlePost.post)

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (comments.length < 1) return <></>

    return (
        <Box sx={styles.commentsContainer} className={classes.scrollBar} >
            {comments.map(comment => {
                return <Comment key={comment._id} {...comment} />
            })}
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '3px'
        },
        '&::-webkit-scrollbar-track': {
            // '-webkit-box-shadow': 'inset 0 0 6px #9fa2ff'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#9fa2ff',
        }
    }
}));


const styles = {
    commentsContainer: {
        py: 2,
        ['@media (min-width:970px)']: { // eslint-disable-line no-useless-computed-key
            maxHeight: '400px',
            overflow: 'auto',
            mt: '17px',
            pb: '20px'
        },
    }
}
